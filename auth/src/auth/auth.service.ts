import { Inject, Injectable, Logger, RequestTimeoutException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { timeout, catchError } from 'rxjs/operators';
import { TimeoutError, throwError } from 'rxjs';
import { compareSync, hash } from 'bcrypt';
 

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_CLIENT')
        private readonly client: ClientProxy,
        private readonly jwtService: JwtService
    ){}

    async validateUser(username: string, password: string): Promise<any> {
        try {
            const user = await this.client.send(
                { role:'user', cmd: 'get' },
                { username })
                .pipe(
                     timeout(5000),
                     catchError(err => {
                        if (err instanceof TimeoutError) {
                            return throwError(new RequestTimeoutException());
                        }
                        return throwError(err);
                    }),
                    ).toPromise();
                if (password == user?.password) {
                    return user;
                }
                return null;
            } catch(e){
                Logger.log(e);
                throw e;
            } finally{}    
        }

    async login(user) {
        const payload = { user, sub: user.username, role: user.role, companyId: user.companyId};
        return {
            user:user,
            accessToken: this.jwtService.sign(payload)
        };
    }

    validateToken(jwt: string) {
        return this.jwtService.verify(jwt);
      }


    async rolecheck(jwt: string, roles: string) {
          const payload: any = this.jwtService.decode(jwt, { json: true });
          return payload.role == roles;

    }

    async getCompanyId(jwt: string) {
        const payload: any = this.jwtService.decode(jwt, { json: true });
        return payload.companyId;
    }
}

