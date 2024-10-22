import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../../../../Action/Services/auction.service';

@Component({
  selector: 'app-lost-auction',
  templateUrl: './lost-auction.component.html',
  styleUrls: ['./lost-auction.component.css']
})
export class LostAuctionComponent{
page:number=1;
lostAuctions:any[]=[];
  constructor(private auctionService:AuctionService) { 
    this.auctionService.getLost().subscribe({
      next:(response:any[])=>{
        console.log(response);
        
          this.lostAuctions=response;
      },
      error:(error:any)=>{
        console.log("error in retrieving data");

      }
    })
  }

  ngOnInit() {
  }

}
