export interface Notification {
  id: number;
  message: string;
  readStatus: boolean;
  createdAt: string;
  recipientId: number;
}
