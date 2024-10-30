import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../../../Action/Services/auction.service';
import { BidService } from '../../../Action/Services/bid.service';
import { error } from 'console';
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


  constructor(private route :ActivatedRoute,private auctionService :AuctionService,private bidService:BidService){}

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
  
}
Close(id:number):void{
  this.auctionService.CloseAuction(id).subscribe({
    next:res=>{
    console.log(res);

      
    }
  })

}

  
}

