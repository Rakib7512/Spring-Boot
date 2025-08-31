import { ParcelTracking } from "./trackingParcel.model";

export enum ParcelStatus {
  BOOKED = 'BOOKED',
  // Add other statuses if needed
}

export class Parcel {
  id?: number;
  trackingId?: string;

  senderName!: string;
  receiverName!: string;
  senderPhone!: string;
  receiverPhone!: string;

  addressLineForSender1!: string;
  addressLineForSender2!: string;
  addressLineForReceiver1!: string;
  addressLineForReceiver2!: string;

  status!: ParcelStatus | string; // safer if using enums
  previousHub?: string;
  currentHub?: string;
  toHub?: string;

  deliveryPerson?: string; // Custom field, not in original model
  bookingAgent!: string;   // Custom field, not in original model

  sendCountry!: string;
  sendDivision!: string;
  sendDistrict!: string;
  sendPoliceStation!: string;

  receiveCountry!: string;
  receiveDivision!: string;
  receiveDistrict!: string;
  receivePoliceStation!: string;

  size!: string;
  fee?: number;
  verificationCode!: string;

  bookingDate!: Date;
  createdAt?: Date;

  trackingHistory!: ParcelTracking[];

  receivedByEmployeeId?: number;     // Custom field
  receivedByEmployeeName?: string;   // Custom field
}
