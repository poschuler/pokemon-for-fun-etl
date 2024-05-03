import { AppConfigurationsModule } from '@app/app/configurations/app-configurations.module';
import { MongoDBService } from '@app/mongo-db/mongo-db.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [AppConfigurationsModule],
  providers: [MongoDBService],
  exports: [MongoDBService],
})
export class MongoDBModule {}
