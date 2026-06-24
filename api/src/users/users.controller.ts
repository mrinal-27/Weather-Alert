import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get('telegram-code')
  async getTelegramLinkCode(
    @Query('email') email: string,
  ) {
    const result =
      await this.usersService.generateTelegramLinkCode(
        email,
      );

    if (!result) {
      return {
        error: 'User not found',
      };
    }

    return {
      code: result.code,
      message: `Send /link ${result.code} to the bot`,
    };
  }

  @Get('status')
  async getStatus(
    @Query('email') email: string,
  ) {
    return this.usersService.findByEmail(
      email,
    );
  }
}