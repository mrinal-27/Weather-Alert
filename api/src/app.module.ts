import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { TelegramModule } from './telegram/telegram.module';
import { WeatherModule } from './weather/weather.module';
import { SchedulerModule } from './scheduler/scheduler.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ScheduleModule.forRoot(),

    MongooseModule.forRoot(process.env.MONGO_URI!),

    AuthModule,
    UsersModule,
    AdminModule,
    TelegramModule,
    WeatherModule,
    SchedulerModule,
  ],
})
export class AppModule {}
