import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../services/api.service';
import { CommonServiceService } from '../../services/common-service.service';

@Component({
  selector: 'app-otpverification',
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.css'],
})
export class OtpFormComponent implements OnInit {
  msg: string;
  status: boolean;
  constructor(
    private service: ApiService,
    private commonService: CommonServiceService,
    private router: Router,
    private redirectService: AppComponent
  ) { }
  otpData = {
    "account_sid": "",//twilio account sid
    "auth_token": "", // twilio auth token
    "sender": "", // twilio sender phone number
    "reciever": "", //mobile verified in twilio
    eventtype: 'phnumverify',
  };
  otpData1 = {
    "account_sid": "",//twilio account sid
    "auth_token": "", // twilio auth token
    "sender": "", // twilio sender phone number
    "reciever": "", //mobile verified in twilio
    eventtype: 'forgotpwd',
  };

  ngOnInit(): void {
    if (this.redirectService.redirectedFromForgetPassword == true) {
      this.checkOtp(this.otpData1);
    } else {
      this.checkOtp(this.otpData);
    }
  }

  otp: any;
  otpReceived: any;
  authComplete() {
    if (this.otpReceived == this.otp) {
      if (this.redirectService.redirectedFromForgetPassword == true) {
        this.redirectService.redirectedFromForgetPassword = false;
        this.router.navigate(['/changePassword']);
      } else {
        this.service.createUser(this.commonService.user).then(
          (postData) => {
            this.router.navigate(['/login']);
          },
          (error) => {
            console.log('exception occured');
          }
        );
      }
    } else {
      alert("Wrong OTP entered, please enter valid OTP");
    }
  }
  checkOtp(data: any) {
    this.service.getOtp(data).then(
      (success) => {
        this.otpReceived = success;
      },
      (error) => console.log(error)
    );
  }
}
