import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
@UseGuards(AuthGuard('google'))
async googleCallback(
  @Req() req: any,
  @Res() res: any,
) {
  const user =
    await this.authService.validateGoogleUser(
      req.user,
    );

  const frontendUrl =
    process.env.FRONTEND_URL ||
    'https://weather-alert-mauve.vercel.app';

  if (
    user.status === 'pending' ||
    user.status === 'approved' ||
    user.status === 'rejected'
  ) {
    return res.redirect(
      `${frontendUrl}/status?email=${encodeURIComponent(
        user.email,
      )}`,
    );
  }

  return res.redirect(
    `${frontendUrl}/request-access?email=${encodeURIComponent(
      user.email,
    )}&name=${encodeURIComponent(
      user.name,
    )}`,
  );
}
}