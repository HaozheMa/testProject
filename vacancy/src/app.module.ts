import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VacancyService } from './vacancy/vacancy.service';
import { VacancyController } from './vacancy/vacancy.controller';
import { VacancyModule } from './vacancy/vacancy.module';

@Module({
  imports: [VacancyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
