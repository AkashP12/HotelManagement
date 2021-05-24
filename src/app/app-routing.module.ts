import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingFormComponent } from './components/booking-form/booking.component';
import { AboutComponent } from './components/about/about.component';
import { AddMoneyToWalletComponent } from './components/AddMoneyWallet/add-money.component';
import { FinaliseBookingComponent } from './components/finalise-booking/checkout.component';
import { UserBookingCompnent } from './components/user-booking/my-booking.component';
import { UserProfileComponent } from './components/user-profile/profile.component';
import { RoomCheckComponent } from './components/room-check/room-available.component';

import { AadhaarComponent } from './components/aadhar/aadharverification.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OtpFormComponent } from './components/otp-form/otpverification.component';
import { RegisterComponent } from './components/register/register.component';
import { PasswordResetComponent } from './components/password-reset/resetpassword.component';
import { ChangePasswordFormComponent } from './components/change-password-form/change-password.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'resetpassword', component: PasswordResetComponent },
  { path: 'aadharverification', component: AadhaarComponent },
  { path: 'otpverification', component: OtpFormComponent },
  { path: 'myBooking', component: UserBookingCompnent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'addMoney', component: AddMoneyToWalletComponent },
  { path: 'roomCheck', component: RoomCheckComponent },
  { path: 'checkout', component: FinaliseBookingComponent },
  { path: 'booking', component: BookingFormComponent },
  { path: 'about', component: AboutComponent },
  { path: 'changePassword', component: ChangePasswordFormComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  LoginComponent,
  RegisterComponent,
  HomeComponent,
  PasswordResetComponent,
  AadhaarComponent,
  OtpFormComponent,
  UserBookingCompnent,
  UserProfileComponent,
  AddMoneyToWalletComponent,
  RoomCheckComponent,
  FinaliseBookingComponent,
  BookingFormComponent,
  AboutComponent,
  ChangePasswordFormComponent
];
