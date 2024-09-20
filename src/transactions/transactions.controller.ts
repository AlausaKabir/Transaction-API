import { Controller, Get, UseGuards, Request, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Transactions')
@ApiBearerAuth()
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get('history')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get paginated transaction history for the logged-in user' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'startDate', required: false, example: '2023-01-01' })
  @ApiQuery({ name: 'endDate', required: false, example: '2023-12-31' })
  @ApiResponse({ status: 200, description: 'Transaction history retrieved successfully' })
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
