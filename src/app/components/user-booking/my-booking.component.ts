import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CommonServiceService } from '../../services/common-service.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css']
})
export class UserBookingCompnent implements OnInit {
  cancelConfirm: boolean = false;
  constructor(
    private service: ApiService,
    private commonService: CommonServiceService,
    private datePipe: DatePipe,
    private router: Router
  ) { }
  msg: string = '';
  data: any;
  room = {
    id: '101',
    bookings: [
      {
        bookingStatus: false
      }
    ]
  };
  userBookings = [];
  otpData =
    {
      "account_sid": "",//twilio account sid
      "auth_token": "", // twilio auth token
      "sender": "", // twilio sender phone number
      "reciever": "", //mobile verified in twilio
      "eventtype": "cancelbooking"
    }
  ngOnInit(): void {
    this.userBookings = []
    this.cancelConfirm = false;
    this.data = this.commonService.user;
    this.service.getBookings().subscribe(res => {
      res.map(item => {
        let fromDate = this.datePipe.transform(item.bookedFrom, 'yyyy-MM-dd');
        let currDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        let delStatus = false;
        let bookingStatus = 'Expired'
        if (fromDate > currDate && item.currentStatus && item.uId === this.commonService.user.id) {
          delStatus = true;
          bookingStatus = "Active"
        }
        if (fromDate > currDate && !item.currentStatus && item.uId === this.commonService.user.id) {
          delStatus = false;
          bookingStatus = "Cancelled"
        }
        item.bookingStatus = bookingStatus;
        item.delStatus = delStatus
        if (item.uId == this.commonService.user.id) {
          this.userBookings.push(item)
        }
      });
    });
  }
  cancelBooking(bookingId) {
    this.cancelConfirm = confirm('are you sure???');
    if (this.cancelConfirm === true) {
      this.service.getBookingById(bookingId).subscribe(res => {
        res.currentStatus = false;
        this.service.cancelUpdateBooking(res).then(
          data => {
            this.service.getOtp(this.otpData).then(
              data => {
                console.log(data)
                this.ngOnInit()
              },
              error => {
                this.ngOnInit()
                console.log(error)
              }
            );
          }
        );
        this.room.id = res.rId;
        this.data.wallet = this.data.wallet + (res.bookedDays * res.costPerDay);
        this.service.updateWallet(this.data);
        this.service.cancelUpdateRoom(this.room);
      });
    }
  }
}
