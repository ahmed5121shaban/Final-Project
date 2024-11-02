import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../../../Action/Services/auction.service';
import { BidService } from '../../../Action/Services/bid.service';
import { error } from 'console';


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
  auctionEndDate!: Date; 
  countdown: string = '';
  private countdownInterval: any;

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
        this.auctionEndDate = new Date(res.endDate);
        console.log(this.auction);
    
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
    this.startCountdown();
  });
  
}
ngOnDestroy(): void {
  clearInterval(this.countdownInterval); 
}
// Close(id:number):void{
//   this.auctionService.CloseAuction(id).subscribe({
//     next:res=>{
//     console.log(res);

      
//     }
//   })

// }

startCountdown() {
  this.countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const endTime = this.auctionEndDate.getTime(); 
    const timeLeft = endTime - now;

    if (timeLeft > 0) {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
if(days>0){
this.countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}else if(hours>0){
this.countdown = `${hours}h ${minutes}m ${seconds}s`;
}else if (minutes>0){
this.countdown = `${minutes}m ${seconds}s`;
}else{
this.countdown = `${seconds}s`;
}
     
    } else {
      this.countdown = 'Auction Ended';
      clearInterval(this.countdownInterval);
    }
  }, 1000);
}
}

