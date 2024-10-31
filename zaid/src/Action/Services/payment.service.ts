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
  addPaypalAmountUrl="api/payment/create-paypal-payment";
  addStripeAmountUrl="api/payment/create-stripe-payment";
  executePaypalPaymentUrl="api/Payment/auction/success";
  apiUrl = environment.apiUrl
  constructor(private http:HttpClient) {}

  userHavePayment(itemID:number,auctionID:number){
    return this.http.get(`${this.apiUrl}${this.userHavePaymentUrl}${itemID}/${auctionID}`);
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


  placeBid(bid:any){
    return this.http.post(`${this.apiUrl}${this.addBidUrl}`,bid)
  }

  AddStripeAmount(amount:number,currency:string,auctionId:number){

    return this.http.post(`${this.apiUrl}${this.addStripeAmountUrl}`,{Amount:amount,Currency:"USD",auctionID:auctionId});
  }
  AddPaypalAmount(amount:number,currency:string,auctionId:number){
    console.log(currency,typeof currency);
    return this.http.post(`${this.apiUrl}${this.addPaypalAmountUrl}`,{Amount:amount,Currency:"USD",auctionID:auctionId});
  }
  executePaypalPayment(paymentId:string,payerId:string,auctionId:number){
    const url = `${this.apiUrl}${this.executePaypalPaymentUrl}?paymentId=${paymentId}&PayerID=${payerId}&auctionId=${auctionId}`;
  return this.http.get(url);
  }


  IsUserHavePayment(){
    return this.http.get(`${this.apiUrl}api/payment/user-have-payment`);
  }

}
