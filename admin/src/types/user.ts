export interface User {
  _id: string;
  name: string;
  email: string;
  provider?: string;
  providerId?: string;
  status: string;
  telegramChatId?: string;
  telegramLinkCode?: string;
  createdAt?: string;
  updatedAt?: string;
}
