import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { NgForm } from '@angular/forms';
import {
  FormBuilder,
  Validators,
  ControlContainer,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Booking } from 'src/app/commonResource/booking';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingFormComponent implements OnInit {
  Booking = new Booking();
  minDate: any="";
  minDateTo:any="";
  title: string = '';
  roomType = ['Single', 'Double', 'Twin', 'Triple'];

  constructor(private service: CommonServiceService, private router: Router) {}
  ngOnInit(): void {
    this.title = 'Book your stay';
    this.getDate();
  }
  checkAvailable() {
    this.service.storeBooking(this.Booking);
    this.router.navigate(['/roomCheck']);
  }

  getDate() {
    let date: any = new Date();
    let fromDate: any = date.getDate();
    if (fromDate < 10) {
      fromDate = '0' + fromDate;
    }
    let toDate: any =date.getDate()+1;

    if (fromDate < 10) {
      fromDate = '0' + fromDate;
    }
    let month: any = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let year: any = date.getFullYear();
    this.minDate = year + '-' + month + '-' + fromDate;
    this.minDateTo = year + '-' + month + '-' + toDate;
    
  }
}
