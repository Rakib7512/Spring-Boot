export interface ChatMessage {
  id?: number;          // optional id for message
  sender: string;       // sender's name/email/role
  content: string;      // message content
  timestamp: Date;      // when the message was sent
}