import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../commonResource/booking';
import { User } from '../commonResource/user';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor() { }
  booking=new Booking();
  storeBooking(bData:Booking){
    this.booking=bData;
  }
  user=new User();
  storeUser(uData:User){
    this.user=uData;
  }
}
