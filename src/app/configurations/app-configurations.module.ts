import { AppConfigurationsService } from '@app/app/configurations/app-configurations.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [AppConfigurationsService],
  exports: [AppConfigurationsService],
})
export class AppConfigurationsModule {}
