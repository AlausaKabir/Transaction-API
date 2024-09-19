import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //!REGISTRATION ENDPOINT
  //   @Post('signup')
  //   async signup(
  //     @Body('email') email: string,
  //     @Body('password') password: string,
  //   ) {
  //     const result = await this.authService.signup(email, password);
  //     return result;
  //   }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
