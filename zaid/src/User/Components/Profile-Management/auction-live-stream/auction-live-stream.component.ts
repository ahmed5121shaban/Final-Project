import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../../../../Action/Services/auction.service';
import { BidService } from '../../../../Action/Services/bid.service';
import { error } from 'console';
import * as signalR from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
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
    ,private toastr: ToastrService
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
    console.log(res);


    }
  })
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



  // currentSlide = 0;
  // itemImages = [
  //   { src: 'hd_item_3649360_e2ceb54174.jpg'},
  //   { src: 'hd_item_3649360_e2ceb54174.jpg'},
  //   { src: 'hd_item_3649360_e2ceb54174.jpg'},
  //   { src: 'hd_item_3649360_e2ceb54174.jpg'}



    // Add more slides as needed
  // ];

  // similarAuctions = [
  //   { title: 'Item Title 1', img: 'large_item_3649360_bbb8f93d91.jpg', price: '$10.00' },
  //   { title: 'Item Title 2', img: 'large_item_3649360_bbb8f93d91.jpg', price: '$20.00' },
  //   { title: 'Item Title 3', img: 'hd_item_3649360_e2ceb54174.jpg', price: '$30.00' },
  //   { title: 'Item Title 4', img: 'large_item_3649360_bbb8f93d91.jpg', price: '$40.00' },
  //   { title: 'Item Title 5', img: 'large_item_3649360_bbb8f93d91.jpg', price: '$50.00' },
  //   { title: 'Item Title 6', img: 'large_item_3649360_bbb8f93d91.jpg', price: '$60.00' }
  // ];

  // ngOnInit(): void {
  //   this.groupItems();
  // }
  // //to display 3 sildes
  // groupedItems:Array<any> = [];
  // groupItems(): void {
  //   for (let i = 0; i < this.similarAuctions.length; i += 3) {
  //     this.groupedItems.push(this.similarAuctions.slice(i, i + 3));
  //   }
  // }



  // // comments
  // comments: Comment[] = [
  //   { id: 1, text: 'This is a comment from a sara.',author:"sara", replies: [{id:2,text:"This is a reply from a buyer."}] },
  //   { id: 1, text: 'This is a comment from a nermeen.',author:"nermeen",  replies: [{id:2,text:"This is a reply from a buyer."}] },
  //   { id: 1, text: 'This is a comment from a nada.', author:"nada", replies: [{id:2,text:"This is a reply from a buyer."}] }
  //   // Add more comments if needed
  // ];


}
