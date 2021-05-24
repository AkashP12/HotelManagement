import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/commonResource/user';
import { ApiService } from 'src/app/services/api.service';
import { CommonServiceService } from '../../services/common-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user = new User();
  msg = '';
  constructor(private service: ApiService, private commonService: CommonServiceService, private router: Router) {}

  ngOnInit(): void {}

  registerUser() {
    this.user.id=this.user.email;
    this.service.getUser(this.user.id).subscribe(
      data => {
        if(data != null){
          this.msg = "User Already exists. Please Login";
        }
        else{
          this.msg = '';
          this.commonService.storeUser(this.user);
          this.router.navigate(['/aadharverification']);
        }
      }
    );
  }
}
