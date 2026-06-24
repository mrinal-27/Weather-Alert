import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  'google',
) {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL:
  'https://weather-alert-pzda.onrender.com/auth/google/callback',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ) {
    return {
      email: profile.emails?.[0]?.value,
      name: profile.displayName,
      providerId: profile.id,
      provider: 'google',
    };
  }
}