import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../../Services/auction.service';


@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {
  activeAuctions: any[] = []; 
  endedAuctions: any[] = []; 

  constructor(
    private auctionService: AuctionService,
  ) {}

  ngOnInit(): void {
    this.loadActiveAuctions(); 
    this.loadEndedAuctions();
  }

  loadActiveAuctions(): void {
    this.auctionService.getAllActive().subscribe({
      next: (data) => {
        this.activeAuctions = data; // Store the fetched auctions
        console.log(this.activeAuctions);
      },
      error: (err) => {
        console.error('Error fetching active auctions', err); // Handle error
      }
    });
  }
  loadEndedAuctions(): void {
    this.auctionService.getAllEnded().subscribe({
      next: (data) => {
        this.endedAuctions = data; // Store the fetched auctions
        console.log(this.endedAuctions);
      },
      error: (err) => {
        console.error('Error fetching active auctions', err); // Handle error
      }
    });
  }
}


