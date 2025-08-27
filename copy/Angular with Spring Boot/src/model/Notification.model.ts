export interface Notification {
  id?: number;  // Add this line if missing
  message: string;
  sender: string;
  receiver:string
  readStatus: boolean;
  createdAt: string;
  recipientId: number;
}
