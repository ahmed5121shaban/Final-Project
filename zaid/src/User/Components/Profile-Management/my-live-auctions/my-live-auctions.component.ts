import { Component } from '@angular/core';
import { AuctionService } from '../../../../Action/Services/auction.service';

@Component({
  selector: 'app-my-live-auctions',
  templateUrl: './my-live-auctions.component.html',
  styleUrl: './my-live-auctions.component.css'
})
export class MyLiveAuctionsComponent {
auctions:any[]=[];
page:number=0;

constructor(private auctionService:AuctionService){
this.auctionService.getBuyerLiveAuctions().subscribe({
  next:(response)=>{
this.auctions=response;
  },
  error:(error)=>{
    console.log(error);
    
  }
})
}
}
