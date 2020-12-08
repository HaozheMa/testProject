import { Document } from 'mongoose';

export interface Vacancy extends Document {
  readonly title: string;
  readonly description: string;
  readonly expiredAt: Date;
  readonly companyId: string;
}