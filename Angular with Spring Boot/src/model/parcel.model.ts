import { ParcelTracking } from "./trackingParcel.model";
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

  status!: string;
  currentHub?: string;
  deliveryPerson?: string;
  createdAt?: Date;
  bookingAgent!: string;
  
  sendCountry!: string;
  sendDivision!: string;
  sendDistrict!: string;
  sendPoliceStation!: string;

  receiveCountry!: string;
  receiveDivision!: string;
  receiveDistrict!: string;
  receivePoliceStation!: string;
  trackingHistory!: ParcelTracking[];
  size!: string
  fee?: number;
  verificationCode!:string
  bookingDate!:Date;


   receivedByEmployeeId?: number;
  receivedByEmployeeName?: string;
  


}