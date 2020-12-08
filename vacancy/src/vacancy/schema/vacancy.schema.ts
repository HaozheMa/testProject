import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VacancyDocument = Vacancy & Document;

@Schema()
export class Vacancy {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    expiredAt: Date;

    @Prop()
    companyId: string;
}

export const VacancySchema = SchemaFactory.createForClass(Vacancy);
