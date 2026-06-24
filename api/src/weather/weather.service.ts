import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  async getWeather() {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );

    return response.data;
  }
}