import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  async getWeather() {
  console.log(
    'OPENWEATHER KEY:',
    process.env.OPENWEATHER_API_KEY?.slice(-5),
  );

  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`,
  );

  console.log('WEATHER API SUCCESS');

  return response.data;
}
}