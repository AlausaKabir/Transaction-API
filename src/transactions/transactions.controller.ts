import {
  Controller,
  Get,
  UseGuards,
  Request,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiQuery,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('Transactions')
@ApiBearerAuth()
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get('history')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get paginated transaction history for the logged-in user',
  })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 50 })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiResponse({
    status: 200,
    description: 'Transaction history retrieved successfully',
  })
  async getTransactions(
    @Request() req,
    @Query('page', new ParseIntPipe()) page: number = 1,
    @Query('limit', new ParseIntPipe()) limit: number = 50,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const userId = req.user.userId;

    return this.transactionsService.getTransactionHistory(
      userId,
      page,
      limit,
      startDate,
      endDate,
    );
  }
}
