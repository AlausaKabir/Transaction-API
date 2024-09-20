import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Status } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async bulkCreateTransactions(userId: string, count: number) {
    const transactions = Array(count)
      .fill(null)
      .map((_, i) => ({
        userId,
        reference: `REF${i + 1}-${userId.slice(0, 6)}`,
        amount: Math.floor(Math.random() * 100) * 1000,
        date: new Date(Date.now() - i * 86400000), // Spread over the last days
        type: i % 2 === 0 ? 'CREDIT' : 'DEBIT',
        status:
          i % 3 === 0
            ? Status.SUCCESS
            : i % 2 === 0
              ? Status.PENDING
              : Status.FAILED,
        remark: i % 2 === 0 ? 'Transaction processed successfully' : null,
      }));

    await this.prisma.transaction.createMany({ data: transactions });
  }

  async getTransactionHistory(
    userId: string,
    page: number = 1,
    limit: number = 50,
    startDate?: string,
    endDate?: string,
  ) {
    const skip = (page - 1) * limit;
    const where: any = { userId };

    // Filter by date range if provided
    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    // Fetch the total number of transactions for this user (with filters if any)
    const totalTransactions = await this.prisma.transaction.count({
      where,
    });

    // Fetch the transactions for the current page
    const transactions = await this.prisma.transaction.findMany({
      where,
      skip,
      take: limit,
      orderBy: { date: 'desc' },
    });

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalTransactions / limit);

    // Return the transactions along with pagination details
    return {
      pagination: {
        currentPage: page,
        totalPages,
        totalTransactions,
        limit,
      },
      transactions,
    };
  }
}
