import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { User, UserSchema} from './schema/user.schema';
import { UserController } from './user.controller';
import { DatabaseModule } from './database/database.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { userProviders } from './user.providers';
import { auth_host } from 'src/config';


@Module({
    imports: [DatabaseModule,
        MongooseModule.forRoot(
            'mongodb+srv://test:test@cluster0.xpoy8.mongodb.net/tttest?retryWrites=true&w=majority', { 
                connectionName: 'tttest'
            }), 
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}],'tttest'),
        ClientsModule.register([{
            name: 'AUTHROLE_CLIENT', 
            transport: Transport.TCP,
            options: {
              host: auth_host,
              port: 4000
            }
          },{
            name: 'AUTH_CLIENT', 
            transport: Transport.TCP,
            options: {
              host: auth_host,
              port: 4000
            }}]),
          ],
        
    controllers: [UserController],
    providers: [UserService, ...userProviders]
    
})
export class UserModule {}