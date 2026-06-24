import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersService: UsersService,
    private readonly telegramService: TelegramService,
  ) {}

  async getPendingUsers() {
    return this.usersService.getPendingUsers();
  }

  async getApprovedUsers() {
    return this.usersService.getApprovedUsers();
  }

  async getRejectedUsers() {
    return this.usersService.getRejectedUsers();
  }

  async getStats() {
    const pending = await this.usersService.getPendingUsers();
    const approved = await this.usersService.getApprovedUsers();
    const rejected = await this.usersService.getRejectedUsers();

    return {
      pending: pending.length,
      approved: approved.length,
      rejected: rejected.length,
      total: pending.length + approved.length + rejected.length,
    };
  }

  async approveUser(id: string) {
    const user = await this.usersService.approveUser(id);

    if (user?.telegramChatId) {
      await this.telegramService.sendMessage(
        user.telegramChatId,
        '🎉 Your WeatherGuard account has been approved!',
      );
    }

    return user;
  }

  async rejectUser(id: string) {
    const user = await this.usersService.rejectUser(id);

    if (user?.telegramChatId) {
      await this.telegramService.sendMessage(
        user.telegramChatId,
        '❌ Your WeatherGuard account request has been rejected.',
      );
    }

    return user;
  }

  async testTelegram() {
    await this.telegramService.sendMessage(
      '1344991669',
      '🎉 WeatherGuard Telegram is working!',
    );

    return { success: true };
  }
  async getStatus(email: string) {
  return this.usersService.findByEmail(email);
}
}
