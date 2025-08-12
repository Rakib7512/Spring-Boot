import { ParcelTracking } from "./trackingParcel.model";
export class Parcel {
  id?: number;
  trackingId?: string;
  senderName!: string;
  receiverName!: string;
  senderPhone!: string;
  receiverPhone!: string;
  senderAddress!: string;
  receiverAddress!: string;
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
  weight?: number;
  squareFeet?: number;
  fee?: number;
  verificationCode!:string
  bookingDate!:Date;
  


}