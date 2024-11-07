import { AuctionService } from '../../../../Action/Services/auction.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../../../Action/Services/payment.service';

@Component({
  selector: 'app-won-auction',
  templateUrl: './won-auction.component.html',
  styleUrls: ['./won-auction.component.css']
})
export class WonAuctionComponent  {
  page:number=1;
  wonAuctions:any[]=[];
  auctioId:number=-1


  constructor(private auctionService:AuctionService,private routerActive:ActivatedRoute,private toaster:ToastrService,
    private paymentService:PaymentService) {}

  ngOnInit() {
    this.routerActive.queryParams.subscribe((params) => {
      console.log(
        params['paymentId'],
        params['PayerID'],
        params['auctionId'],
        params['success'],
        'Payment Query Params'
      );

      if (params['paymentId'] && params['PayerID']) {
        this.executePayment(params['paymentId'], params['PayerID'], params['auctionId']);
      }

      if (params['success']==1)
        this.toaster.success('Payment completed successfully');



    });
    this.GetAllWonAuction();
  }

  executePayment(paymentId: string, payerId: string, auctionId: number) {
    this.paymentService.executePaypalPayment(paymentId, payerId, auctionId).subscribe({
      next: (res: any) => {
        this.toaster.success('Payment completed successfully');
        this.auctioId = auctionId;
      },
      error: (err: any) => {
        // this.toaster.error('Payment not completed');
      }
    });
  }

  GetAllWonAuction(){
    this.auctionService.AllDoneAuctions().subscribe({
      next:(data:any)=>{
        this.wonAuctions = data.result;
        console.log(this.wonAuctions);
      },
      error:(error:any)=>{
        console.log("error in retrieving data");
      }
    })
  }



}
