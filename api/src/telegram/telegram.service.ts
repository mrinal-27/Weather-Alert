import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import axios from 'axios';
import { UsersService } from '../users/users.service';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: Telegraf;

  constructor(
    private readonly usersService: UsersService,
  ) {
    this.bot = new Telegraf(
      process.env.BOT_TOKEN!,
    );
  }

async onModuleInit() {
  this.bot.start(async (ctx) => {
    await ctx.reply(
      '👋 Welcome to WeatherGuard!\n\nSend your code using:\n/link ABC123',
    );
  });

  this.bot.command('link', async (ctx) => {
    const text = ctx.message.text;

    const parts = text.split(' ');

    if (parts.length < 2) {
      await ctx.reply(
        '❌ Please provide a code.\nExample: /link ABC123',
      );
      return;
    }

    const code = parts[1];

    console.log('Searching for code:', code);

    const linkedUser =
      await this.usersService.linkTelegramChat(
        code,
        ctx.chat.id.toString(),
      );

    console.log('Found user:', linkedUser);

    if (linkedUser) {
      await ctx.reply(
        '✅ Telegram account linked successfully!',
      );
    } else {
      await ctx.reply(
        '❌ Invalid or expired code.',
      );
    }
  });

  this.bot.launch().then(() => {
    console.log(
      '✅ Telegram bot polling started',
    );
  }).catch((err) => {
    console.error(
      'Telegram launch error:',
      err,
    );
  });
}
  async sendMessage(
    chatId: string,
    message: string,
  ) {
    return axios.post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        chat_id: chatId,
        text: message,
      },
    );
  }
}