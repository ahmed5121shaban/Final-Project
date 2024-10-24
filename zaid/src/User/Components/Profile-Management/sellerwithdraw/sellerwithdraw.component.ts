import { Component } from '@angular/core';
import { AuctionService } from '../../../../Action/Services/auction.service';

@Component({
  selector: 'app-sellerwithdraw',
  templateUrl: './sellerwithdraw.component.html',
  styleUrl: './sellerwithdraw.component.css'
})
export class SellerwithdrawComponent {
  availableBalance: number=0;
  amount:number=0;
  paypalEmail:string="";
  stripeEmail:string="";
  constructor(private auctionService: AuctionService) {
    this.getAvailableBalance();

  }

  getAvailableBalance() {
    this.auctionService.getAvailableBalance().subscribe({
      next: (response: any) => {
        console.log(response);
        this.availableBalance = response.result.availablebalance;
        this.paypalEmail=response.result.paymentEmail.paypalEmail;
        this.stripeEmail=response.result.paymentEmail.stripelEmail;
        
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
      
    },
    error:(error)=>{
console.log(error);

    }
  })
}

}
