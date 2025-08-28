import { ParcelTracking } from "./trackingParcel.model";


export class RecParcelEmpDetModel {
    id!: string;
    parcelId!: string;
    employeeId!: string;
    employeeName!: string;
    currentHub!: string;
    receivedAt!: Date;
    senderName!: string;
    receiverName!: string;
    senderPhone!: string;
    receiverPhone!: string;
    senderAddress!: string;
    receiverAddress!: string;
    status!: string;
    deliveryPerson?: string;
    createdAt?: Date;
    
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
    verificationCode!: string





}
