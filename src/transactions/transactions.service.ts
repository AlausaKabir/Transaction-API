import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Status } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async bulkCreateTransactions(userId: string, count: number) {
    const transactions = Array(count)
      .fill(null)
      .map((_, i) => {
        const daysAgo = Math.floor(Math.random() * 7);
        const date = new Date(Date.now() - daysAgo * 86400000);

        const status =
          i % 3 === 0
            ? Status.SUCCESS
            : i % 2 === 0
              ? Status.PENDING
              : Status.FAILED;

        const remark =
          status === Status.SUCCESS
            ? 'Transaction successful'
            : status === Status.PENDING
              ? 'Transaction pending'
              : 'Transaction failed';

        return {
          userId,
          reference: `REF${i + 1}-${userId.slice(0, 6)}`,
          amount: Math.floor(Math.random() * 100) * 1000,
          date,
          type: i % 2 === 0 ? 'CREDIT' : 'DEBIT',
          status,
          remark,
        };
      });

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

    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const totalTransactions = await this.prisma.transaction.count({
      where,
    });

    const transactions = await this.prisma.transaction.findMany({
      where,
      skip,
      take: limit,
      orderBy: { date: 'desc' },
    });

    const totalPages = Math.ceil(totalTransactions / limit);

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
