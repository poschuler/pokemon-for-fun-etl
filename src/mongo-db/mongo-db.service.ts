import { AppConfigurationsService } from '@app/app/configurations/app-configurations.service';
import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class MongoDBService {
  private readonly URL: string;
  private readonly mongoClient: MongoClient;

  constructor(
    private readonly appConfigurationService: AppConfigurationsService,
  ) {
    this.URL = this.appConfigurationService.MONGOURL;
    this.mongoClient = new MongoClient(this.URL);
  }

  async connect(): Promise<void> {
    await this.mongoClient.connect();
  }

  async disconnect(): Promise<void> {
    await this.mongoClient.close();
  }

  get client(): MongoClient {
    return this.mongoClient;
  }

  // get db() {
  //   return this.mongoClient.db(this.appConfigurationService.MONGODB);
  // }
}
