import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../services/common-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class UserProfileComponent implements OnInit {
  constructor(private commonService:CommonServiceService) {}
  data: any;

  ngOnInit(): void {
    this.data=this.commonService.user;
  }

}
