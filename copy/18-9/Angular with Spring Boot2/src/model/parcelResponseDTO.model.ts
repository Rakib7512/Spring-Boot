
export interface ParcelResponseDTO {
  id: number;
  trackingId: string;
  status: string;
  currentHub: string;
  toHub: string;
  senderName:string;
  receiverName:string
  sendCountry: string;
  sendDivision: string;
  sendDistrict: string;
  sendPoliceStation: string;
  

  // অন্যান্য প্রয়োজনীয় ফিল্ড যোগ করতে পারো
}
