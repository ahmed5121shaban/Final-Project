import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../../Services/auction.service';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../Services/payment.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-won-auction',
  templateUrl: './won-auction.component.html',
  styleUrl: './won-auction.component.css'
})
export class WonAuctionComponent implements OnInit {

  completeAuctionPayment!:any;

  constructor(private auctionService:AuctionService,private activeRout:ActivatedRoute,
    private paymentService:PaymentService,private location: Location) {}

  ngOnInit() {
    this.activeRout.params.subscribe((param)=>{
      this.CompleteAuctionPayment(parseInt(param['itemID']));
    })

  }

  CompleteAuctionPayment(itemID:number){
    this.auctionService.CompleteAuctionPayment(itemID).subscribe({
      next:(res:any)=>{
        this.completeAuctionPayment = res.result;
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  placeTotalAuction(totalAuctionAmount:number,method:number,currency:string,itemId:number){
    if(method==0)
      this.paymentService.AddPaypalAmount(totalAuctionAmount,currency,itemId).subscribe({
        next:(res:any)=>{console.log(res);window.location.href = res.result},
        error:(err)=>{console.log(err);}
      })
      else{
        this.paymentService.AddStripeAmount(totalAuctionAmount,currency,itemId).subscribe({
          next:(res:any)=>{console.log(res);window.location.href = res.result},
          error:(err)=>{console.log(err);}
        })
      }

  }

  back(){
    this.location.back();
  }

}

