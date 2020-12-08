import { Connection } from 'mongoose';
import { CompanySchema } from './schema/company.schema';

export const companyProviders = [
  {
    provide: 'COMPANY_MODEL',
    useFactory: (connection: Connection) => connection.model('Company', CompanySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];