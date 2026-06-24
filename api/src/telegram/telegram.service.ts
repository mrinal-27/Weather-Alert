import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import axios from 'axios';

import { UsersService } from '../users/users.service';
import { WeatherService } from '../weather/weather.service';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: Telegraf;

  constructor(
    private readonly usersService: UsersService,
    private readonly weatherService: WeatherService,
  ) {
    this.bot = new Telegraf(
      process.env.BOT_TOKEN!,
    );
  }

//   async onModuleInit() {
//     this.bot.start(async (ctx) => {
//       await ctx.reply(
//         '👋 Welcome to WeatherGuard!\n\nSend your code using:\n/link ABC123',
//       );
//     });

//     this.bot.command('link', async (ctx) => {
//       const text = ctx.message.text;

//       const parts = text.split(' ');

//       if (parts.length < 2) {
//         await ctx.reply(
//           '❌ Please provide a code.\nExample: /link ABC123',
//         );
//         return;
//       }

//       const code = parts[1];

//       const linkedUser =
//         await this.usersService.linkTelegramChat(
//           code,
//           ctx.chat.id.toString(),
//         );

//       if (!linkedUser) {
//         await ctx.reply(
//           '❌ Invalid or expired code.',
//         );
//         return;
//       }

//       await ctx.reply(
//         '✅ Telegram account linked successfully!',
//       );

//       try {
//         const weather =
//           await this.weatherService.getWeather();

//         const temperature = Math.round(
//           weather.main?.temp ?? 0,
//         );

//         const condition =
//           weather.weather?.[0]?.description
//             ? weather.weather[0].description
//                 .split(' ')
//                 .map(
//                   (word: string) =>
//                     word[0].toUpperCase() +
//                     word.slice(1),
//                 )
//                 .join(' ')
//             : 'Unknown';

//         await ctx.reply(
//           `🌦 Current Weather

// Location: Pune
// Temperature: ${temperature}°C
// Condition: ${condition}`,
//         );
//       } catch (error) {
//         console.error(error);

//         await ctx.reply(
//           '⚠️ Account linked successfully, but weather data could not be fetched.',
//         );
//       }
//     });

//     this.bot
//       .launch()
//       .then(() => {
//         console.log(
//           '✅ Telegram bot polling started',
//         );
//       })
//       .catch((err) => {
//         console.error(
//           'Telegram launch error:',
//           err,
//         );
//       });
//   }


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
async onModuleInit() {
  console.log('TELEGRAM INIT START');

  this.bot.start(async (ctx) => {
    await ctx.reply(
      '👋 Welcome to WeatherGuard!\n\nSend your code using:\n/link ABC123',
    );
  });

  this.bot.command('link', async (ctx) => {
  console.log('LINK COMMAND HIT');

  const text = ctx.message.text;

  console.log('MESSAGE:', text);
    const parts = text.split(' ');

    if (parts.length < 2) {
      await ctx.reply(
        '❌ Please provide a code.\nExample: /link ABC123',
      );
      return;
    }

    const code = parts[1];

    const linkedUser =
      await this.usersService.linkTelegramChat(
        code,
        ctx.chat.id.toString(),
      );

    if (!linkedUser) {
      await ctx.reply(
        '❌ Invalid or expired code.',
      );
      return;
    }

    await ctx.reply(
  '✅ Telegram account linked successfully!',
);

console.log('STEP A');

try {
  console.log('STEP B');

  const weather =
    await this.weatherService.getWeather();

  console.log('STEP C');
  console.log(weather);

  const temperature = Math.round(
    weather.main?.temp ?? 0,
  );

  console.log('STEP D');

  const condition =
    weather.weather?.[0]?.description
      ? weather.weather[0].description
          .split(' ')
          .map(
            (word: string) =>
              word[0].toUpperCase() +
              word.slice(1),
          )
          .join(' ')
      : 'Unknown';

  console.log('STEP E');

  await ctx.reply(
    `🌦 Current Weather

Location: Pune
Temperature: ${temperature}°C
Condition: ${condition}`,
  );

  console.log('STEP F');
} catch (error: any) {
  console.error(
    'WEATHER ERROR:',
    error?.response?.data || error,
  );

  await ctx.reply(
    '⚠️ Weather failed',
  );
}
  });

  console.log('BEFORE BOT LAUNCH');

 this.bot
  .launch()
  .then(() => {
    console.log(
      '✅ Telegram bot polling started',
    );
  })
  .catch((err) => {
    console.error(
      'Telegram launch error:',
      err,
    );
  });

console.log('AFTER LAUNCH CALL');
console.log(
  'BOT TOKEN END:',
  process.env.BOT_TOKEN?.slice(-10),
);
}
}