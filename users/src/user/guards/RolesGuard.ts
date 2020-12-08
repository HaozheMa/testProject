import { Injectable, CanActivate, ExecutionContext, Inject, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';


export class RolesGuard implements CanActivate {
     constructor(
    @Inject('AUTHROLE_CLIENT')
    private readonly client: ClientProxy,
    private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(" roles: " + roles)
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    try{
        const res = await this.client.send(
          { role: 'auth', cmd: 'roleCheck' },
          { jwt: request.headers['authorization']?.split(' ')[1],
            roles: roles})
          .pipe(timeout(5000))
          .toPromise<boolean>();
  
          return res;
      } catch(err) {
        Logger.error(err);
        return false;
      }
    }
  }
