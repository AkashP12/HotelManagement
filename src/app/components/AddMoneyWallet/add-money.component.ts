import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonServiceService } from '../../services/common-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.css']
})
export class AddMoneyToWalletComponent implements OnInit {
  title: string;
  amount: number;
  cardHolder: string;
  cardNumber: number;
  cardExpiry: string;
  cardCVV: number;
  constructor(private apiService:ApiService, private commonService:CommonServiceService, private router:Router) { 
    this.title = "Add money to wallet"
  }

  ngOnInit(): void {}
  addMoney(addMoneyForm:NgForm) {
    this.commonService.user.wallet=this.commonService.user.wallet+addMoneyForm.value.amount;
    this.apiService.addMoney(this.commonService.user);
    this.router.navigate(['/profile']);
  }
}
