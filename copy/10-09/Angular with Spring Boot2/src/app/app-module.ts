import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AddPoliceStation } from './add-police-station/add-police-station';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Home } from './home/home';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AddDistrict } from './add-district/add-district';
import { AddDivision } from './add-division/add-division';
import { AddCountry } from './add-country/add-country';
import { AddEmployee } from './add-employee/add-employee';
import { AddParcel } from './add-parcel/add-parcel';
import { TransferHub } from './transfer-hub/transfer-hub';
import { TrackParcel } from './track-parcel/track-parcel';
import { ViewEmp } from './view-emp/view-emp';
import { ViewAddParcel } from './view-add-parcel/view-add-parcel';
import { UpdateParcel } from './update-parcel/update-parcel';
import { Registration } from './auth/registration/registration';
import { Login } from './auth/login/login';
import { Userprofile } from './auth/userprofile/userprofile';
import { Logout } from './auth/logout/logout';
import { ViewHubTransfer } from './view-hub-transfer/view-hub-transfer';
import { ParcelReqDetails } from './parcel-req-details/parcel-req-details';
import { Notifications } from './notifications/notifications';
import { ParcelDetails } from './parcel-details/parcel-details';
import { Contact } from './contact/contact';
import { ViewReceiveParcel } from './view-receive-parcel/view-receive-parcel';
import { ViewHub } from './view-hub/view-hub';
import { CreateHub } from './create-hub/create-hub';
import { AllUser } from './user/all-user/all-user';
import { AddConsumer } from './add-consumer/add-consumer';
import { ConsumerProfileComponent } from './consumer/consumer-profile.component/consumer-profile.component';
import { AddNewParcel } from './add-new-parcel/add-new-parcel';
import { EmployeeProfileComponent } from './employee/employee-profile.component/employee-profile.component';



@NgModule({
  
  declarations: [
    App,
    AddPoliceStation,
    Home,
    AddDistrict,
    AddDivision,
    AddCountry,
    AddEmployee,
    AddParcel,
    TransferHub,
    TrackParcel,
    ViewEmp,
    ViewAddParcel,
    UpdateParcel,
    Registration,
    Login,
    Userprofile,
    Logout,
    ViewHubTransfer,
    ParcelReqDetails,
   Notifications,
    ParcelDetails,
    Contact,
    ViewReceiveParcel,
    ViewHub,
    CreateHub,
    AllUser,
    AddConsumer,
    ConsumerProfileComponent,
    AddNewParcel,
    EmployeeProfileComponent,
    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch()
    )
  ],
  bootstrap: [App]
})
export class AppModule { }
