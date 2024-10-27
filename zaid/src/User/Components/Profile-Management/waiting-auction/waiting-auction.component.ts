import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../../../../Action/Services/auction.service';


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

  page:number=1;
  InCompletedAuctions:any[]=[];
  constructor(private auctionService:AuctionService) { }

  ngOnInit() {
    this.AllInCompletedAuctions();
  }

  
  AllInCompletedAuctions(){
    this.auctionService.AllInCompletedAuctions().subscribe({
      next:(res:any)=>{
        this.InCompletedAuctions = res.result
        console.log(res);
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }



}
