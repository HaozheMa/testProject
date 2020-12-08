import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Model } from 'mongoose';
import { CompanyCreateDto } from './dto/company-create.dto';
import { Company } from './interface/company.interface';

@Injectable()
export class CompanyService {
    constructor(@Inject( 'COMPANY_MODEL' ) 
    private companyModel: Model<Company>
    ){}

    async findAll(): Promise<Company[]> {
        return this.companyModel.find().exec();
    }

    async findById(id: string): Promise<Company> {
        console.log("id" + id)
        return this.companyModel.findById(id).exec();
    }

    async create(createCompanyDto: CompanyCreateDto): Promise<Company> {
        const createdCompany = new this.companyModel(createCompanyDto);
        return createdCompany.save();
    }

   

}
