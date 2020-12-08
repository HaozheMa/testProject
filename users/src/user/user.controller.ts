import { Body, Controller, Get, Param, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MessagePattern } from '@nestjs/microservices/decorators';
import { hash } from 'bcrypt';
import { UserCreateDto } from './dto/user-create.dto';
import { AuthGuard } from './guards/AuthGuard';
import { Roles } from './guards/roles.decorator';
import { RolesGuard } from './guards/RolesGuard';
import { User } from './schema/user.schema';
import { UserService } from './user.service';


@Controller('User')
export class UserController {
    constructor(private readonly userService: UserService){}

    @MessagePattern({ role: 'user', cmd: 'get' })
    async findUserByUsername(data: any): Promise<User> {
        console.log(data.username);
        return this.userService.findUserByUsername(data.username);
    }

   
    @Get("getall")
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Roles('admin')
    @UseGuards(AuthGuard,RolesGuard)
    @Post("post")
    async create(@Body() createUserDto: UserCreateDto) {
        await this.userService.create(createUserDto);
    }
        
}
