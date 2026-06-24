import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  User,
  UserDocument,
  UserStatus,
} from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async findByTelegramChatId(chatId: string) {
    return this.userModel.findOne({
      telegramChatId: chatId,
    });
  }

  async createUser(userData: {
    email: string;
    name: string;
    provider: string;
    providerId: string;
  }) {
    const existingUser = await this.findByEmail(
      userData.email,
    );

    if (existingUser) {
      return existingUser;
    }

    return this.userModel.create({
      ...userData,
      status: UserStatus.PENDING,
    });
  }

  async getPendingUsers() {
    return this.userModel.find({
      status: UserStatus.PENDING,
    });
  }

  async getApprovedUsers() {
    return this.userModel.find({
      status: UserStatus.APPROVED,
    });
  }

  async getRejectedUsers() {
    return this.userModel.find({
      status: UserStatus.REJECTED,
    });
  }

  async approveUser(id: string) {
    return this.userModel.findByIdAndUpdate(
      id,
      {
        status: UserStatus.APPROVED,
      },
      {
        new: true,
      },
    );
  }

  async rejectUser(id: string) {
    return this.userModel.findByIdAndUpdate(
      id,
      {
        status: UserStatus.REJECTED,
      },
      {
        new: true,
      },
    );
  }

  async generateTelegramLinkCode(
    email: string,
  ) {
    const user = await this.findByEmail(
      email,
    );

    if (!user) {
      return null;
    }

    const code = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    const expiry = new Date(
  Date.now() + 30 * 60 * 1000,
);

    await this.userModel.findByIdAndUpdate(
      user._id,
      {
        telegramLinkCode: code,
        telegramLinkCodeExpiry: expiry,
      },
    );



    return { code };
  }

async linkTelegramChat(
  code: string,
  chatId: string,
) {
  console.log('INPUT CODE:', code);

  const user = await this.userModel.findOne({
    telegramLinkCode: code.trim(),
  });

  console.log('FOUND USER:', user);

  if (!user) {
    console.log('NO USER FOUND');
    return null;
  }

  console.log(
    'EXPIRY:',
    user.telegramLinkCodeExpiry,
  );

  console.log(
    'NOW:',
    new Date(),
  );

  if (
    user.telegramLinkCodeExpiry &&
    user.telegramLinkCodeExpiry < new Date()
  ) {
    console.log('CODE EXPIRED');
    return null;
  }

  console.log('LINKING USER');

  return this.userModel.findByIdAndUpdate(
    user._id,
    {
      telegramChatId: chatId,
      telegramLinkCode: null,
      telegramLinkCodeExpiry: null,
    },
    {
      new: true,
    },
  );
}
}