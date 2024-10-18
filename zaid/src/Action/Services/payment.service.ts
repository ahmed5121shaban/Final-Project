import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  addBidUrl = "api/bid/add";
  firstAuctionPaymentUrl = "api/bid/first-auction-payment";
  addPaymentEmailUrl = "api/Payment/add-payment-email";
  getPaymentEmailUrl = "api/Payment/get-payment-email";
  userHavePaymentUrl= "api/Bid/user-have-payment/";
  PaymentForBuyerUrl= "api/payment/payment-for-buyer";
  apiUrl = environment.apiUrl
  constructor(private http:HttpClient) {}

  userHavePayment(itemID:number){
    console.log(itemID,"user have buyer apiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    return this.http.get(`${this.apiUrl}${this.userHavePaymentUrl}${itemID}`);
  }

  firstPaymentAuction(payment:any){
    return this.http.post(`${this.apiUrl}${this.firstAuctionPaymentUrl}`,payment)
  }

  addPaymentEmail(value:any){
    return this.http.post(`${this.apiUrl}${this.addPaymentEmailUrl}`,value)
  }

  getPaymentEmail(){
    return this.http.get(`${this.apiUrl}${this.getPaymentEmailUrl}`)
  }

  getPaymentForBuyer(){
    return this.http.get(`${this.apiUrl}${this.PaymentForBuyerUrl}`)
  }

  placeBid(bid:any){
    return this.http.post(`${this.apiUrl}${this.addBidUrl}`,bid)
  }


}
