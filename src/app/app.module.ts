import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { AddMoneyToWalletComponent } from './components/AddMoneyWallet/add-money.component';
import { BookingFormComponent } from './components/booking-form/booking.component';
import { FinaliseBookingComponent } from './components/finalise-booking/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { UserBookingCompnent } from './components/user-booking/my-booking.component';
import { UserProfileComponent } from './components/user-profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RoomCheckComponent } from './components/room-check/room-available.component';
import { AadhaarComponent } from './components/aadhar/aadharverification.component';
import { OtpFormComponent } from './components/otp-form/otpverification.component';
import { PasswordResetComponent } from './components/password-reset/resetpassword.component';
import { AboutComponent } from './components/about/about.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { routingComponents, AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboard } from './components/admin-dashboard/admin-ops.component';
import { DatePipe } from '@angular/common';
import { ChangePasswordFormComponent } from './components/change-password-form/change-password.component'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddMoneyToWalletComponent,
    AddMoneyToWalletComponent,
    FinaliseBookingComponent,
    LoginComponent,
    UserBookingCompnent,
    BookingFormComponent,
    UserProfileComponent,
    RegisterComponent,
    RoomCheckComponent,
    AadhaarComponent,
    OtpFormComponent,
    PasswordResetComponent,
    AboutComponent,
    routingComponents,
    AdminDashboard,
    ChangePasswordFormComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  exports: [AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
