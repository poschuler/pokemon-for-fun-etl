import { AppConstantsService } from '@app/app/constants/app-constants.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [AppConstantsService],
  exports: [AppConstantsService],
})
export class AppConstantsModule {}
