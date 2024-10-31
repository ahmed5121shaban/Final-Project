import { Component, NgModule, OnInit } from '@angular/core';
import { AuctionService } from '../../../../Action/Services/auction.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-live-auctions',
  templateUrl: './live-auctions.component.html',
  styleUrls: ['./live-auctions.component.css']
})


export class LiveAuctionsComponent implements OnInit {
LiveAuctions : any[] =[];
page:number=1;
  constructor(private AuctionService:AuctionService) { }

  ngOnInit() {
  this.getLiveAuctions();
  }

  getLiveAuctions():void {
  this.AuctionService.getSellerAllLive().subscribe({
    next :(data)=>{
    this.LiveAuctions=data;
    console.log("auctions",data);
    },
    error :(err)=>{
    console.log("the error is",err)
    }
  });
  }



}
