import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../../Services/auction.service';
import { CategoryService } from '../../../Admin/Services/category.service';
import { Pagination } from '../../Models/models/pagination.model';

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
  // page: number = 1; 
  // itemsPerPage: number = 6; 
  // endedItemsPerPage: number = 6; // items per page for ended auctions
  // totalItemsActive: number = 0;
  // totalItemsended: number = 0;
  // searchtxt:string ='';
  // selectedCategory: string = ''; 
  // sortOption: string = 'Id'; 

  pageActive: number = 1; 
  pageEnded: number = 1; 
  itemsPerPage: number = 6; 
  endedItemsPerPage: number = 6;
  totalItemsActive: number = 0;
  totalItemsEnded: number = 0;
  searchtxt: string = '';
  selectedCategory: string = ''; 
  sortOption: string = 'Id'; 

  constructor(
    private auctionService: AuctionService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get category from URL if available
    this.route.params.subscribe(params => {
      this.selectedCategory = params['category'] || ''; 
      this.loadActiveAuctions(); 
      this.loadEndedAuctions();
      this.loadCategories();
    });
  }
  
  loadActiveAuctions(): void {
    console.log("Current Page:", this.pageActive);
    console.log("Items per Page:", this.itemsPerPage);
    this.auctionService.getPaginatedAuctions(
      this.searchtxt,
      this.sortOption,
      false,
      this.itemsPerPage,
      this.pageActive,
      this.selectedCategory 
    ).subscribe({
      next: (pagination: Pagination<any[]>) => {
        this.activeAuctions = pagination.list || [];
        this.totalItemsActive = pagination.totalCount || 0;
      },
      error: (err) => {
        console.error('Error fetching active auctions', err);
      }
    });
  }
  
  // Load ended auctions
  loadEndedAuctions(): void {
    // this.auctionService.getPaginatedEndedAuctions().subscribe({
    //   next: (data) => {
    //     this.endedAuctions = data; 
    //   },
    //   error: (err) => {
    //     console.error('Error fetching ended auctions', err); 
    //   }
    // });

    console.log("Current Page:", this.pageEnded);
    console.log("Items per Page:", this.itemsPerPage);
    this.auctionService.getPaginatedEndedAuctions(
      this.searchtxt,
      this.sortOption,
      false,
      this.itemsPerPage,
      this.pageEnded,
      this.selectedCategory 
    ).subscribe({
      next: (pagination: Pagination<any[]>) => {
        this.endedAuctions = pagination.list || [];
        this.totalItemsEnded = pagination.totalCount || 0;
      },
      error: (err) => {
        console.error('Error fetching active auctions', err);
      }
    });
  }

  // Load categories
  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.result; 
      },
      error: (err) => {
        console.error('Error fetching categories', err); 
      }
    });
  }

  totalPagesActive(): number {
    return Math.ceil(this.totalItemsActive / this.itemsPerPage);
  }
  
  totalPagesEnded(): number {
    return Math.ceil(this.totalItemsEnded / this.endedItemsPerPage);
  }
  
  onActivePageChange(newPageActive: number): void {
    console.log('Active Page changed to:', newPageActive);
    if (newPageActive > 0 && newPageActive <= this.totalPagesActive()) {
      this.pageActive = newPageActive;
      this.loadActiveAuctions();
    }
  }

  onEndedPageChange(newPageEnded: number): void {
    console.log('Ended Page changed to:', newPageEnded);
    if (newPageEnded > 0 && newPageEnded <= this.totalPagesEnded()) {
      this.pageEnded = newPageEnded;
      this.loadEndedAuctions();
    }
  }
    // Handle Category Selection changes
  onCategorySelect(category: string): void {
    this.selectedCategory = category;
    this.pageActive = 1; 
    this.pageEnded = 1; // Reset both pages to 1 when category changes
    this.loadActiveAuctions(); 
    this.loadEndedAuctions();
  }
  
  // Handle sorting option changes
  onSortOptionChange(option: string): void {
    this.sortOption = option;
    this.pageActive = 1; // Reset to first page when sorting
    this.pageEnded = 1; // Reset to first page when sorting
    this.loadActiveAuctions();
    this.loadEndedAuctions();
  }
}