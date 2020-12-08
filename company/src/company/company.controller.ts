import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyCreateDto } from './dto/company-create.dto';
import { Company } from './schema/company.schema';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService){}
    @Get()
    async findAll(): Promise<Company[]> {
        return this.companyService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: string): Promise<Company> {
        console.log("id" + id)
        return this.companyService.findById(id);
    }

    @Post("post")
    async create(@Body() createCompanyDto: CompanyCreateDto) {
        await this.companyService.create(createCompanyDto);
    }
    

}
