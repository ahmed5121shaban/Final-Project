import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { AuctionService } from '../../../../Action/Services/auction.service';
import { BidService } from '../../../../Action/Services/bid.service';
import { error } from 'console';
import * as signalR from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
// interface Reply {
//   id: number;
//   text: string;
// }

// interface Comment {
//   id: number;
//   author:string;
//   text: string;
//   replies: Reply[];
// }

@Component({
  selector: 'app-auction-live-stream',
  templateUrl: './auction-live-stream.component.html',
  styleUrl: './auction-live-stream.component.css'
})
export class AuctionLiveStreamComponent {

  auction :any ;
  auctionId! :number ;
  highestBid! :number ;
  startprice! :number;
  hubConnection!:signalR.HubConnection;
  allBids:any;

  constructor(private route :ActivatedRoute,private auctionService :AuctionService,private bidService:BidService
    ,private toastr: ToastrService,
    private location:Location
  ){
    this.openConnectionAndGetAllBidsWithLast();
  }

  getHighestBid():void {
    this.bidService.getHighestBid(this.auctionId).subscribe({
      next :(res)=>{
        if(res.result==""){
          console.log("pricc",this.startprice);

          this.highestBid=this.startprice;
        }
        else{
          this.highestBid =res.result.Amount;
        }

      },
      error :(err)=>{
        console.log("error",err);
      }
    })
  }
  getAuctionDetails(): void {
    this.auctionService.getAuctionById(this.auctionId).subscribe({
     next: res => {
        this.auction = res;
        console.log(this.auction);

       // this.startprice=this.auction.item.startPrice;
      //  this.getHighestBid();
       // console.log('Auction:', this.auction,this.startprice);
      },
      error:err => {
        console.log(err);

      }
  });
  }


ngOnInit(): void {
  this.route.params.subscribe(params =>{
    this.auctionId = +params['id'];
    this.getAuctionDetails();
  });
  this.hubConnection.on('allBids', (res) => {
    this.allBids = res;
    console.log('All bids received:', res);
  });
}
Close(id:number):void{
  this.auctionService.CloseAuction(id).subscribe({
    next:res=>{
      this.location.back();
      console.log(res);
    
    


    }
  });
  
}

openConnectionAndGetAllBidsWithLast() {
  this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:5204/bidsHub', {
      transport: signalR.HttpTransportType.WebSockets,
      skipNegotiation: true
    })
    .build();

  this.hubConnection
    .start()
    .then(() => {
      console.log('SignalR Connection started');
      return this.hubConnection.invoke('joinGroup', this.auctionId);
    })
    .then(() => {
      console.log('Joined group successfully, fetching bids...');
      return this.hubConnection.invoke('AllBids', this.auctionId);
    })
    .catch((err) => {
      console.log('SignalR Connection Error: ', err);
      this.toastr.error(err);
    });

}


}
