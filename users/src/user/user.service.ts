import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { User } from './interface/user.interface';
import { UserCreateDto } from './dto/user-create.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@Inject( 'USER_MODEL' ) private userModel: Model<User>){}

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findUserByUsername(user: string): Promise<User> {
        return this.userModel.findOne({username: user}).exec();
        
    }

    async create(createUserDto: UserCreateDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

}