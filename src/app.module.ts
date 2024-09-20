import { ConstantService } from './constants/constant.service';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { TransactionsModule } from './transactions/transactions.module';
import { ConstantModule } from './constants/constant.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    PrismaModule,
    TransactionsModule,
    ConstantModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConstantService],
})
export class AppModule {}
