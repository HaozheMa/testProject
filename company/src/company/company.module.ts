import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { auth_host } from 'src/config';
import { CompanyController } from './company.controller';
import { companyProviders } from './company.provider';
import { CompanyService } from './company.service';
import { DatabaseModule } from './database/datadase.module';
import { Company, CompanySchema } from './schema/company.schema';

@Module({
    imports: [DatabaseModule,
        MongooseModule.forRoot(
            'mongodb+srv://test:test@cluster0.xpoy8.mongodb.net/Company?retryWrites=true&w=majority', { 
                connectionName: 'company'
            }), 
        MongooseModule.forFeature([{name: Company.name, schema: CompanySchema}],'company'),
        ClientsModule.register([{
            name: 'AUTH_CLIENT', 
            transport: Transport.TCP,
            options: {
              host: auth_host,
              port: 4000
            }}]),
          ],
        
    controllers: [CompanyController],
    providers: [CompanyService, ...companyProviders]
})
export class CompanyModule {

    
}
