import { Module } from '@nestjs/common';

import { ConstantService } from './constant.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [ConstantService],
  exports: [ConstantService],
})
export class ConstantModule {}
