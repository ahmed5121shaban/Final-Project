import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../../../../Action/Services/auction.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../../../Action/Services/payment.service';

export interface DoneAuction{
  itemID:string,
  auctionTitle:string,
  sellerName:string,
  startDate:Date,
  endDate:Date,
}

@Component({
  selector: 'app-waiting-auction',
  templateUrl: './waiting-auction.component.html',
  styleUrls: ['./waiting-auction.component.css']
})
export class WaitingAuctionComponent implements OnInit {

  allDoneAuction!:DoneAuction[];

  constructor(private actionService:AuctionService,private routerActive:ActivatedRoute,private toaster:ToastrService,private paymentService:PaymentService) {

   }

  ngOnInit() {
    this.routerActive.params.subscribe((param)=>{
      if(param['paymentId'])
        this.paymentService.executePaypalPayment(param['paymentId'],param['payerId'],param['auctionId']).subscribe({
          next:(res:any)=>{
            this.toaster.success(res.message)
          },
          error:(err)=>{
            this.toaster.success(`the payment not completed :( => ${err.message}`)
          }
      })
    })
    this.AllDoneAuctions();
  }

  AllDoneAuctions(){
    this.actionService.AllDoneAuctions().subscribe({
      next:(res:any)=>{
        this.allDoneAuction = res.result
        console.log(res)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }



}
