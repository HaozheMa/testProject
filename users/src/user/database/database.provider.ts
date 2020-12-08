import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://test:test@cluster0.xpoy8.mongodb.net/tttest?retryWrites=true&w=majority'),
  },
];