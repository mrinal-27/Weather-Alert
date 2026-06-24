import {
  Controller,
  Get,
  Param,
  Patch,
} from '@nestjs/common';

import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
  ) {}

  @Get('pending')
  async getPendingUsers() {
    return this.adminService.getPendingUsers();
  }

  @Get('approved')
  async getApprovedUsers() {
    return this.adminService.getApprovedUsers();
  }
  @Get('rejected')
async getRejectedUsers() {
  return this.adminService.getRejectedUsers();
}

  @Get('stats')
  async getStats() {
    return this.adminService.getStats();
  }

  @Patch('approve/:id')
  async approveUser(
    @Param('id') id: string,
  ) {
    return this.adminService.approveUser(id);
  }

  @Patch('reject/:id')
  async rejectUser(
    @Param('id') id: string,
  ) {
    return this.adminService.rejectUser(id);
  }

  @Get('test-telegram')
  async testTelegram() {
    return this.adminService.testTelegram();
  }
  @Get('status/:email')
async getStatus(
  @Param('email') email: string,
) {
  return this.adminService.getStatus(email);
}

}
