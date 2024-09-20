import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConstantService {
  constructor(private readonly config: ConfigService) {}

  get jwtSecret(): string {
    return this.config.get<string>('JWT_SECRET');
  }

  get jwtExpiresIn(): string {
    return this.config.get<string>('JWT_EXPIRES');
  }

  get port(): number {
    return this.config.get<number>('PORT');
  }

  get appName(): string {
    return this.config.get<string>('APP_NAME');
  }

  get appUrl(): string {
    const nodeEnv = this.config.get<string>('NODE_ENV');
    return nodeEnv === 'production'
      ? this.config.get<string>('APP_PROD_URL')
      : this.config.get<string>('APP_DEV_URL');
  }

  get isProduction(): boolean {
    return this.config.get<string>('NODE_ENV') === 'production';
  }
}
