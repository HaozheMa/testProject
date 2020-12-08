import { Connection } from 'mongoose';
import { VacancySchema } from './schema/vacancy.schema';

export const vacancyProviders = [
  {
    provide: 'VACANCY_MODEL',
    useFactory: (connection: Connection) => connection.model('Vacancy', VacancySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];