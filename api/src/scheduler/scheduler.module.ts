import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { UsersModule } from '../users/users.module';
import { TelegramModule } from '../telegram/telegram.module';
import { WeatherModule } from '../weather/weather.module';

@Module({
  imports: [UsersModule, TelegramModule, WeatherModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
