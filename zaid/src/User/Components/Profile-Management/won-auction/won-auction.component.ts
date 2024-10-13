import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../../../../Action/Services/auction.service';

@Component({
  selector: 'app-won-auction',
  templateUrl: './won-auction.component.html',
  styleUrls: ['./won-auction.component.css']
})
export class WonAuctionComponent  {
wonAuctions:any[]=[];
  constructor(private auctionService:AuctionService) { 
    this.auctionService.getWon().subscribe({
      next:(data)=>{
        console.log(data);
        
          this.wonAuctions=data;
      },
      error:(error:any)=>{
        console.log("error in retrieving data");

      }
    })
  }

  ngOnInit() {
  }

}
