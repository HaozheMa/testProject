import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { auth_host } from 'src/config';
import { DatabaseModule } from './database/database.module';
import { Vacancy, VacancySchema } from './schema/vacancy.schema';
import { VacancyController } from './vacancy.controller';
import { vacancyProviders } from './vacancy.providers';
import { VacancyService } from './vacancy.service';

@Module({
    imports: [
        DatabaseModule,
        MongooseModule.forRoot(
            'mongodb+srv://test:test@cluster0.xpoy8.mongodb.net/Vacancy?retryWrites=true&w=majority', { 
                connectionName: 'Vacancy'
            }), 
        MongooseModule.forFeature([{name: Vacancy.name, schema: VacancySchema}],'Vacancy'),
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
            }}])],
    controllers:[VacancyController],
    providers:[VacancyService, ...vacancyProviders]
})
export class VacancyModule {}
