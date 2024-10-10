import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  auctionPaymentMethodUrl = "http://localhost:5204/api/bid/auction-payment-method/";
  firstAuctionPaymentUrl = "http://localhost:5204/api/bid/first-auction-payment/";
  addPaymentEmailUrl = "http://localhost:5204/api/payment/add-payment-email/";
  addPaypalPaymentUrl = "http://localhost:5204/api/payment/add-paypal-payment/";
  addStripePaymentUrl = "http://localhost:5204/api/payment/add-stripe-payment/";
  userHavePaymentUrl= "http://localhost:5204/api/bid/user-have-email/";

  constructor(private http:HttpClient) {}

  userHavePayment(){
    return this.http.get(this.userHavePaymentUrl);
  }

}
