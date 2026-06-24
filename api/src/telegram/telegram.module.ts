import { Module } from '@nestjs/common';

import { TelegramService } from './telegram.service';

import { UsersModule } from '../users/users.module';
import { WeatherModule } from '../weather/weather.module';

@Module({
  imports: [
    UsersModule,
    WeatherModule,
  ],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}