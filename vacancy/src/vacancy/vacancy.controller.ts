import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices/decorators/message-pattern.decorator';
import { VacancyCreateDto } from './dto/vacancy-create.dto';
import { VacancyUpdateDto } from './dto/vacancy-update.dto';
import { AuthGuard } from './guards/AuthGuard';
import { Roles } from './guards/roles.decorator';
import { RolesGuard } from './guards/RolesGuard';
import { Vacancy } from './schema/vacancy.schema';
import { VacancyService } from './vacancy.service';

@UseGuards(AuthGuard)
@Controller('vacancy')
export class VacancyController {
    constructor(private readonly vacancyService: VacancyService){}

    @Get("getall")
    async findAll(): Promise<Vacancy[]> {
        return this.vacancyService.findAll();
    }
    
    @UseGuards(RolesGuard)
    @Roles('admin')
    @Post("create")
    async create(@Body() createVacancyDto: VacancyCreateDto) {
        return await this.vacancyService.create(createVacancyDto);
    }

    @Get(":id")
    async findOne(@Param('id') id: string): Promise<Vacancy> {
        return this.vacancyService.findById(id);
    }

    @UseGuards(RolesGuard)
    @Roles('admin')
    @Put(':id')
    async update(@Param("id") id: string,@Body() updateDto: VacancyUpdateDto) {
        await this.vacancyService.update(id, updateDto);
    }

    @UseGuards(RolesGuard)
    @Roles('admin')
    @Delete(":id")
    async delete(@Param("id") id: string){
        await this.vacancyService.delete(id);
    }
        
}
