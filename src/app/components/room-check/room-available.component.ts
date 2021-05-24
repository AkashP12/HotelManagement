import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { DatePipe } from '@angular/common';

import { ApiService } from 'src/app/services/api.service';
import { CommonServiceService } from 'src/app/services/common-service.service'


@Component({
  selector: 'app-room-available',
  templateUrl: './room-available.component.html',
  styleUrls: ['./room-available.component.css']
})
export class RoomCheckComponent implements OnInit {
  data: any;
  formData: any;
  fromDataForm: any;
  to: any;
  from: any;
  days: number;

  constructor(private service: ApiService, private commonService: CommonServiceService, private router: Router, public datepipe: DatePipe) { }
  ngOnInit(): void {

    let fromDataForm = this.datepipe.transform(this.commonService.booking.fromDate, 'YYYY-MM-dd');
    let toDataForm = this.datepipe.transform(this.commonService.booking.toDate, 'YYYY-MM-dd');
    // ////data from api
    this.service.checkAvailability().subscribe(
      (data) => {
        this.data = data.filter(
          (item: any) => {
            if (item.roomType == this.commonService.booking.room && item.bookings[0].bookingStatus === true && this.datepipe.transform(item.bookings[0].bookingTo, 'YYYY-MM-dd') < fromDataForm) {
              return item;
            }
            return item.bookings[0].bookingStatus === false && item.roomType == this.commonService.booking.room
          }
        )
      },
      (error) => {
        console.log('exception occured' + error);
      }
    );
  }
  bookNow(item: any) {
    this.commonService.booking.rId = item.id;
    this.commonService.booking.room = item.roomType;
    this.commonService.booking.toDate = this.datepipe.transform(this.commonService.booking.toDate, 'YYYY-MM-dd')
    this.commonService.booking.fromDate = this.datepipe.transform(this.commonService.booking.fromDate, 'YYYY-MM-dd');
    this.commonService.booking.costPerDay = item.cost;
    this.from = new Date(this.commonService.booking.fromDate)
    this.to = new Date(this.commonService.booking.toDate)
    this.days = (this.to - this.from) / (1000 * 3600 * 24)+1;
    this.commonService.booking.bookedDays = this.days;
    this.router.navigate(['/checkout'])
  }
}
