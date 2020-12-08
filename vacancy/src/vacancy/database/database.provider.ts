import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://test:test@cluster0.xpoy8.mongodb.net/Vacancy?retryWrites=true&w=majority'),
  },
];