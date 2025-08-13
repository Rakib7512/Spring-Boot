import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { AddPoliceStation } from './add-police-station/add-police-station';
import { AddDistrict } from './add-district/add-district';
import { AddDivision } from './add-division/add-division';
import { AddCountry } from './add-country/add-country';
import { AddEmployee } from './add-employee/add-employee';
import { AddParcel } from './add-parcel/add-parcel';
import { TransferHub } from './transfer-hub/transfer-hub';
import { TrackParcel } from './track-parcel/track-parcel';
import { ViewEmp } from './view-emp/view-emp';
import { ViewAddParcel } from './view-add-parcel/view-add-parcel';
import { ViewHubTransfer } from './view-hub-transfer/view-hub-transfer';
import { Registration } from './auth/registration/registration';
import { ParcelReqDetails } from './parcel-req-details/parcel-req-details';
import { ParcelDetails } from './parcel-details/parcel-details';
import { Login } from './auth/login/login';
import { Logout } from './auth/logout/logout';
import { Contact } from './contact/contact';
import { ViewReceiveParcel } from './view-receive-parcel/view-receive-parcel';
import { CreateHub } from './create-hub/create-hub';
import { ViewHub } from './view-hub/view-hub';
import { Userprofile } from './auth/userprofile/userprofile';
import { AllUser } from './user/all-user/all-user';
import { AddConsumer } from './add-consumer/add-consumer';
import { ConsumerProfileComponent } from './consumer/consumer-profile.component/consumer-profile.component';



const routes: Routes = [
  { path: '', component: Home },
  { path: 'addpolice', component: AddPoliceStation },
  { path: 'addDist', component: AddDistrict },
  { path: 'addDivi', component: AddDivision },
  { path: 'addCountry', component: AddCountry },
  { path: 'addEmp', component: AddEmployee },
  { path: 'addParcel', component: AddParcel },
  { path: 'transferHub', component: TransferHub },
  { path: 'trackParcel', component: TrackParcel },
  { path: 'viewEmp', component: ViewEmp },
  { path: 'viewParcel', component: ViewAddParcel },
  { path: 'viewHubTrans', component: ViewHubTransfer },
  { path: 'reg', component: Registration },
  { path: 'parcelReqDetails', component: ParcelReqDetails },
  { path: 'parcel-details', component: ParcelDetails },
  {path:'login', component:Login},
  {path:'logout', component:Logout},
  {path:'contact', component:Contact},
  {path:'view_RecParcel', component:ViewReceiveParcel},
  {path:'creatHub', component:CreateHub},
  {path:'view_hub',component:ViewHub},
  {path:'user_profile/:id', component:Userprofile},
   {path:'allusers', component:AllUser},
   {path:'registerConsumer', component:AddConsumer},
   {path:'consumerProfile', component:ConsumerProfileComponent}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
