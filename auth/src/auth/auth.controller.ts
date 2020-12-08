import { Controller, Post, UseGuards, Request, RequestMethod, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Console } from 'console';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor( private readonly authService: AuthService ){}

    @UseGuards(LocalAuthGuard)
    @Post('auth')
    async login(@Request() req) {
        console.log("reqw: "+req.headers.authorization)
        return this.authService.login(req.user);
    }

   
    @Get('companyId')
    async getId(@Request() req) {
        console.log(req.headers.authorization.split(" ")[1])
        return this.authService.getCompanyId(req.headers.authorization.split(" ")[1]);
    }

    @MessagePattern({ role: 'auth', cmd: 'check'})
    async loggedIn(data) {
      try {
        const res = this.authService.validateToken(data.jwt);
        return res;
      } catch(e) {
        console.log(e);
        return false;
      }
    }

    @MessagePattern({ role: 'auth', cmd: 'roleCheck'})
    async roleCheck(data) {
      try {
        const res = this.authService.rolecheck(data.jwt, data.roles);
        
        return res;
      } catch(e) {
        console.log(e);
        return false;
      }
    }

}
