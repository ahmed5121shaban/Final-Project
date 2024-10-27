import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../../../../Action/Services/auction.service';

@Component({
  selector: 'app-complete-auction',
  templateUrl: './complete-auction.component.html',
  styleUrls: ['./complete-auction.component.css']
})
export class CompleteAuctionComponent implements OnInit {
  page:number=0;
  CompletedAuctions:any[]=[];
  constructor(private auctionService:AuctionService) { }

  ngOnInit() {
    this.AllCompletedAuctions();
  }

  
  AllCompletedAuctions(){
    this.auctionService.AllCompletedAuctions().subscribe({
      next:(res:any)=>{
        this.CompletedAuctions = res.result
        console.log(res);
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }
}



