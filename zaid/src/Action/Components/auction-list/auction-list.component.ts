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

  // Pagination properties
  page: number = 1; // current page number
  itemsPerPage: number = 6; // items per page for active auctions
  endedItemsPerPage: number = 6; // items per page for ended auctions

  constructor(
    private auctionService: AuctionService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.loadActiveAuctions(); 
    this.loadEndedAuctions();
    this.loadCategories();
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
        console.error('Error fetching ended auctions', err); 
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.result; 
        console.log(this.categories);
      },
      error: (err) => {
        console.error('Error fetching categories', err); 
      }
    });
  }
}
