import { AppConfigurationsModule } from '@app/app/configurations/app-configurations.module';
import { PgService } from '@app/pg/pg.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [AppConfigurationsModule],
  providers: [PgService],
  exports: [PgService],
})
export class PgModule {}
