import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../../../../Action/Services/auction.service';

@Component({
  selector: 'app-complete-auction',
  templateUrl: './complete-auction.component.html',
  styleUrls: ['./complete-auction.component.css']
})
export class CompleteAuctionComponent implements OnInit {
  allCompletedAuction!:CompletedAuction[];
  constructor(private auctionService:AuctionService) { }

  ngOnInit() {
    this.AllCompletedAuctions();
  }

  
  AllCompletedAuctions(){
    this.auctionService.AllCompletedAuctions().subscribe({
      next:(res:any)=>{
        this.allCompletedAuction = res.result
        console.log(res);
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }
}


export interface CompletedAuction{
  auctionTitle:string,
  sellerName:string,
  startDate:Date,
  endDate:Date
}

