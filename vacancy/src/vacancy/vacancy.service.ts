import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { VacancyCreateDto } from './dto/vacancy-create.dto';
import { VacancyUpdateDto } from './dto/vacancy-update.dto';
import { Vacancy } from './interface/vacancy.interface';

@Injectable()
export class VacancyService {
    constructor(@Inject( 'VACANCY_MODEL' ) private vacancyModel: Model<Vacancy>){}

    //see all vacancy
    async findAll(): Promise<Vacancy[]> {
        return this.vacancyModel.find().exec();
    }

    async findById(id: string): Promise<Vacancy> {
        return this.vacancyModel.findById(id).exec();
    }

    async create(createVacancyrDto: VacancyCreateDto): Promise<Vacancy> {
        const createdVacancy = new this.vacancyModel(createVacancyrDto);
        return createdVacancy.save();
    }

    //edit
    async update(_id: string, vacancyUpdateDto: VacancyUpdateDto) :Promise<Vacancy> {
        const updateVac = await this.findVacancy(_id);
        return this.vacancyModel.updateOne(updateVac, vacancyUpdateDto);
    }
    //delete
    async delete(_id: string) :Promise<Vacancy> {
        return await this.vacancyModel.findByIdAndDelete(_id)
    }

    private async findVacancy(id: string): Promise<Vacancy>{
        let vacancy;
        try{
            vacancy = await this.vacancyModel.findById(id).exec();
        }catch (error){
            throw new NotFoundException('could not found vacancy')
        }
        if(!vacancy){
            throw new NotFoundException('could not found vacancy')
        }

        return vacancy;
    }
}
