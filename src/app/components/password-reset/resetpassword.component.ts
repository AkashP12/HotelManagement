import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/commonResource/user';
import { ApiService } from 'src/app/services/api.service';
import { CommonServiceService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
})
export class PasswordResetComponent implements OnInit {
  user = new User();
  otpReceived: any;
  otpData: any;
  emailToSearch: any;
  msg: string;
  constructor(
    private service: ApiService,
    private router: Router,
    private commonService: CommonServiceService,
    private redirectService: AppComponent
  ) {}

  ngOnInit(): void {}
  checkUser() {
    this.service.getUser(this.emailToSearch).subscribe(
      (data) => {
        if (data.id == this.emailToSearch) {
          this.msg = '';
          this.commonService.user = data;
          this.redirectService.redirectedFromForgetPassword = true;
          this.router.navigate(['/otpverification']);
        } else {
          this.msg = 'User Not Found';
        }
      },
      (error) => console.log(error)
    );
  }
}
