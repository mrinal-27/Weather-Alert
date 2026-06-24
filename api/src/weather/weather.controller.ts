import { Controller, Get } from '@nestjs/common';

@Controller('weather')
export class WeatherController {
  @Get('test')
  getWeatherUrl() {
    const city = 'Pune';
    const apiKey = process.env.OPENWEATHER_API_KEY;

    return {
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
    };
  }
}