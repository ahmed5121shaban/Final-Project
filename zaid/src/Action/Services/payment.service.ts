import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  auctionPaymentMethodUrl = "api/bid/auction-payment-method/";
  firstAuctionPaymentUrl = "api/bid/first-auction-payment/";
  addPaymentEmailUrl = "api/payment/add-payment-email/";
  addPaypalPaymentUrl = "api/Payment/auction/join?participantEmail=ahmed-gamal@personal.example.com&depositAmount=10";
  addStripePaymentUrl = "api/payment/add-stripe-payment/";
  userHavePaymentUrl= "api/bid/user-have-email/";
  apiUrl = environment.apiUrl
  constructor(private http:HttpClient) {}

  userHavePayment(){
    return this.http.get(this.userHavePaymentUrl);
  }

  firstPaymentAuction(){
    return this.http.post(`${this.apiUrl}${this.addPaypalPaymentUrl}`,{status:"done"})
  }
}
