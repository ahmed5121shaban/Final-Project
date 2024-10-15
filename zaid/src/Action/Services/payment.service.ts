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
  getHighestBidUrl = "api/bid/get-highest-bid";
  getAllBidsInAuctionUrl = "api/bid/all-bids-auction";
  userHavePaymentUrl= "api/bid/user-have-payment";
  PaymentForBuyerUrl= "api/payment/payment-for-buyer";
  apiUrl = environment.apiUrl
  constructor(private http:HttpClient) {}

  userHavePayment(){
    return this.http.get(`${this.apiUrl}${this.userHavePaymentUrl}`);
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

  getHighestBid(auctionID:number){
    return this.http.get(`${this.apiUrl}${this.getHighestBidUrl}/${auctionID}`)
  }

  getAllBidsInAuction(auctionID:number){
    return this.http.get(`${this.apiUrl}${this.getAllBidsInAuctionUrl}${auctionID}`);
  }

}
