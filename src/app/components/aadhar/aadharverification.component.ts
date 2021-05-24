import { Component, OnInit } from '@angular/core';
import { User } from '../../commonResource/user';
import { Router } from '@angular/router';
import { CommonServiceService } from '../../services/common-service.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-aadharverification',
  templateUrl: './aadharverification.component.html',
  styleUrls: ['./aadharverification.component.css']
})
export class AadhaarComponent implements OnInit {
  user=new User();
  msg;
  constructor(private router: Router, private apiService: ApiService, private commonService: CommonServiceService) { }
  ngOnInit(): void {
    this.user=this.commonService.user;
  }
  
  aadharSubmit(){
    this.commonService.storeUser(this.user);
    this.apiService.checkAadhar(this.user.aadhar).subscribe(
      res=>{
        if(res===true){
          this.msg=""
          this.router.navigate(['/otpverification']);
        }
        else{
          this.msg="Invalid Aadhar Number"
        }
      }
    )
  }
}
