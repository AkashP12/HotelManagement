import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { Booking } from 'src/app/commonResource/booking';
import { BookingPost } from 'src/app/commonResource/bookingPost';
import { User } from 'src/app/commonResource/user';
import { ApiService } from 'src/app/services/api.service';
import { CommonServiceService } from 'src/app/services/common-service.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class FinaliseBookingComponent implements OnInit {
  otpData =
    {
      "account_sid": "",//twilio account sid
      "auth_token": "", // twilio auth token
      "sender": "", // twilio sender phone number
      "reciever": "", //mobile verified in twilio
      "eventtype": "successfulbooking"
    }
  booking = new Booking();
  bookingData = new BookingPost();
  email: any;
  name: any;
  mobileNum: any;
  totalAmount: any;
  user = new User();
  room = {
    id: '101',
    bookings: [
      {
        bookingStatus: true,
        bookingFrom: null,
        bookingTo: null,
        uId: null
      }
    ]
  };
  walletData = {
    id: null,
    wallet: 0
  }
  constructor(private router: Router, private commonService: CommonServiceService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.bookingData.id = 'bhms' + new Date().getTime();
    this.name = this.commonService.user.firstName + " " + this.commonService.user.lastName;
    this.bookingData.uId = this.commonService.user.email;
    this.bookingData.rId = this.commonService.booking.rId;
    this.bookingData.currentStatus = true;
    this.mobileNum = this.commonService.user.mobileNum;
    this.bookingData.bookedFrom = this.commonService.booking.fromDate;
    this.bookingData.bookedTo = this.commonService.booking.toDate;
    this.bookingData.bookedDays = this.commonService.booking.bookedDays;
    this.bookingData.costPerDay = this.commonService.booking.costPerDay;
    this.totalAmount = this.commonService.booking.bookedDays * this.commonService.booking.costPerDay;
  }
  completeBooking() {
    if (this.commonService.user.wallet > this.totalAmount) {
      this.apiService.getOtp(this.otpData).then(
        data => console.log(data),
        error => console.log(error)
      );
      this.apiService.createBooking(this.bookingData)
      this.room.id = this.commonService.booking.rId
      this.room.bookings[0].bookingFrom = this.commonService.booking.fromDate;
      this.room.bookings[0].bookingTo = this.commonService.booking.toDate;
      this.room.bookings[0].uId = this.commonService.user.id;
      this.apiService.cancelUpdateRoom(this.room);
      this.walletData.id = this.commonService.user.email;
      this.walletData.wallet = this.commonService.user.wallet - this.totalAmount;
      this.commonService.user.wallet = this.walletData.wallet;
      this.apiService.updateWallet(this.walletData);
      alert('Booking Successfull with id ' + this.bookingData.id);
      let csvCreator = [
        {
          Booking_Id: this.bookingData.id,
          User_Email: this.bookingData.uId,
          Room_No: this.bookingData.rId,
          From: this.bookingData.bookedFrom,
          To: this.bookingData.bookedTo,
          Days: this.bookingData.bookedDays,
          Amount: this.bookingData.costPerDay * this.bookingData.bookedDays
        }
      ]
      this.downloadFile(csvCreator)
      this.router.navigate(['/myBooking'])
    }
    else {
      this.router.navigate(['/addMoney'])
    }
  }
  cancelBooking() {
    this.router.navigate(['/book'])
  }
  downloadFile(data: any) {
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], { type: 'text/csv' })
    fileSaver.saveAs(blob, `${data[0].Booking_Id}.csv`);
  }
}
