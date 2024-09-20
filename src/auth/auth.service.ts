import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { TransactionsService } from '../transactions/transactions.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private transactionsService: TransactionsService,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      return {
        statusCode: 400,
        message: 'User already exists',
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    await this.transactionsService.bulkCreateTransactions(newUser.id, 200);

    return {
      statusCode: 200,
      message: 'User registered successfully',
      data: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
