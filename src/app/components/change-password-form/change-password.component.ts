import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommonServiceService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordFormComponent implements OnInit {
  password: any;
  msg: string;
  data = {
    id:this.commonService.user.id,
    password: null
  }
  constructor(private service: ApiService, private commonService: CommonServiceService, private route: Router) { }
  
  ngOnInit(): void {
  }
  changePassword() {
    this.data.password = this.password;
    this.service.resetPassword(this.data).then(
      success => {
        alert('password updated')
        this.route.navigate(['/login'])
      }
    )
  }

}
