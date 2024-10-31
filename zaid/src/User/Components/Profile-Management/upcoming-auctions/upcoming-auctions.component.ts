import { Component } from '@angular/core';
import { AuctionService } from '../../../../Action/Services/auction.service';

@Component({
  selector: 'app-upcoming-auctions',
  templateUrl: './upcoming-auctions.component.html',
  styleUrl: './upcoming-auctions.component.css'
})
export class UpcomingAuctionsComponent {
  UpcomingAuctions : any[] =[];
  page:number=1;

    constructor(private AuctionService:AuctionService) { }
  
    ngOnInit() {
    this.getSellerUpcomingAuctions();
    }
  


    getSellerUpcomingAuctions():void {
    this.AuctionService.getSellerUpcomingAuctions().subscribe({
      next :(data)=>{
      this.UpcomingAuctions=data;
      console.log("auctions",data);
      },
      error :(err)=>{
      console.log("the error is",err)
      }
    });
    }
}
