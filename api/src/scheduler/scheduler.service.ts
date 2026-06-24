import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UsersService } from '../users/users.service';
import { TelegramService } from '../telegram/telegram.service';
import { WeatherService } from '../weather/weather.service';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly usersService: UsersService,
    private readonly telegramService: TelegramService,
    private readonly weatherService: WeatherService,
  ) {}

  @Cron('0 8 * * *')
  async sendAlerts() {
    console.log('Weather alert job running');

    const approvedUsers =
      await this.usersService.getApprovedUsers();

    if (!approvedUsers.length) {
      console.log('No approved users to alert');
      return;
    }

    const weather =
      await this.weatherService.getWeather();

    const temperature = Math.round(
      weather.main?.temp ?? 0,
    );

    const condition = weather.weather?.[0]?.description
      ? weather.weather[0].description
          .split(' ')
          .map(
            (word: string) =>
              word[0].toUpperCase() +
              word.slice(1),
          )
          .join(' ')
      : 'Unknown';

    const message = `🌦 Weather Alert

Location: Pune
Temperature: ${temperature}°C
Condition: ${condition}

Stay safe and have a great day!`;

    await Promise.all(
      approvedUsers
        .filter(
          (user) => user.telegramChatId,
        )
        .map((user) =>
          this.telegramService.sendMessage(
            user.telegramChatId!,
            message,
          ),
        ),
    );

    console.log(
      `Sent alerts to ${approvedUsers.length} users`,
    );
  }
}