import { Controller, Get, UseGuards, Request, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get('history')
  @UseGuards(JwtAuthGuard)
  async getTransactions(
    @Request() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.transactionsService.getTransactionHistory(
      req.user.id,
      page,
      limit,
      startDate,
      endDate,
    );
  }
}
