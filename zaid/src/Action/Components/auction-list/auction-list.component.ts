import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../../Services/auction.service';
import { CategoryService } from '../../../Admin/Services/category.service';


@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {
  activeAuctions: any[] = []; 
  endedAuctions: any[] = []; 
  categories: any[] = [];

  constructor(
    private auctionService: AuctionService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.loadActiveAuctions(); 
    this.loadEndedAuctions();
    // this.loadCategories();
  }

  loadActiveAuctions(): void {
    this.auctionService.getAllActive().subscribe({
      next: (data) => {
        this.activeAuctions = data; 
        console.log(this.activeAuctions);
      },
      error: (err) => {
        console.error('Error fetching active auctions', err);
      }
    });
  }
  loadEndedAuctions(): void {
    this.auctionService.getAllEnded().subscribe({
      next: (data) => {
        this.endedAuctions = data; 
        console.log(this.endedAuctions);
      },
      error: (err) => {
        console.error('Error fetching active auctions', err); 
      }
    });
  }
  // loadCategories(): void {
  //   this.categoryService.getCategories().subscribe({
  //     next: (data) => {
  //       this.categories = data; 
  //       console.log(this.categories);
  //     },
  //     error: (err) => {
  //       console.error('Error fetching categories', err); 
  //     }
  //   });
  // }
}


