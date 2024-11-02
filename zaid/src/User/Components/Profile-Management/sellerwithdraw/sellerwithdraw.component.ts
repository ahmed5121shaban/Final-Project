import { Component } from '@angular/core';
import { AuctionService } from '../../../../Action/Services/auction.service';
import { PaymentService } from '../../../../Action/Services/payment.service';

@Component({
  selector: 'app-sellerwithdraw',
  templateUrl: './sellerwithdraw.component.html',
  styleUrl: './sellerwithdraw.component.css'
})
export class SellerwithdrawComponent {
  method:number=0;
  paymentCount:number=0;
  availableBalance: number=0;
  amount:number=0;
  paypalEmail:string="";
  stripeEmail:string="";
  constructor(private auctionService: AuctionService,private paymentService:PaymentService) {
    this.getAvailableBalance();
    this.getPaymentMethodsCount();


  }

  getAvailableBalance() {
    this.auctionService.getAvailableBalance().subscribe({
      next: (response: any) => {
        console.log(response);
        this.availableBalance = response.result.availablebalance;
        this.paypalEmail=response.result.paymentEmail.paypalEmail;
        this.stripeEmail=response.result.paymentEmail.stripeEmail;
        
      },
      error:(error)=>{
console.log(error);

      }
    });
    
  }
withdraw(){
  this.auctionService.withdraw(this.amount).subscribe({
    next:(response)=>{
      console.log(response);
      window.location.href = response.result
    },
    error:(error)=>{
console.log(error);

    }
  })
}

getPaymentMethodsCount(){
  this.paymentService.IsUserHavePayment().subscribe({
    next:(res:any)=>{
       this.paymentCount=res.count;
       this.method=res.method;
       console.log(res)
     },
     error:(err)=>{console.log(err)}
 });}
}
