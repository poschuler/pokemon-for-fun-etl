import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configurations from '@app/app/configurations/configurations';
import { PgModule } from '@app/pg/pg.module';
import { DataLoaderModule } from './data-loader/data-loader.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MongoDBModule } from '@app/mongo-db/mongo-db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      //envFilePath: '.development.env',
      load: [configurations],
    }),
    ScheduleModule.forRoot(),
    PgModule,
    MongoDBModule,
    DataLoaderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
