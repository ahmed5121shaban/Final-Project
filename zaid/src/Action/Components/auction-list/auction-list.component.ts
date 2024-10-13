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
  page: number = 1; 
  itemsPerPage: number = 6; 
  endedItemsPerPage: number = 6; // items per page for ended auctions
  totalItems: number = 0;
  searchtxt:string ='';
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
    console.log("Current Page:", this.page);
    console.log("Items per Page:", this.itemsPerPage);
    this.auctionService.getPaginatedAuctions(
      this.searchtxt,
      this.sortOption,
      false,
      this.itemsPerPage,
      this.page,
      this.selectedCategory 
    ).subscribe({
      next: (pagination: Pagination<any[]>) => {
        this.activeAuctions = pagination.list || [];
        this.totalItems = pagination.totalCount || 0;
      },
      error: (err) => {
        console.error('Error fetching active auctions', err);
      }
    });
  }
  
  // Load ended auctions
  loadEndedAuctions(): void {
    this.auctionService.getAllEnded().subscribe({
      next: (data) => {
        this.endedAuctions = data; 
      },
      error: (err) => {
        console.error('Error fetching ended auctions', err); 
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

  totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
  
  
  onPageChange(newPage: number): void {
    console.log('Page changed to:', newPage);
    if (newPage > 0 && newPage <= this.totalPages()) {
      this.page = newPage;
      this.loadActiveAuctions();
    }
  }

    // Handle Category Selection changes
  onCategorySelect(category: string): void {
    this.selectedCategory = category;
    this.page = 1; 
    this.loadActiveAuctions(); 
  }
  
  // Handle sorting option changes
  onSortOptionChange(option: string): void {
    this.sortOption = option;
    this.page = 1;
    this.loadActiveAuctions();
  }
}