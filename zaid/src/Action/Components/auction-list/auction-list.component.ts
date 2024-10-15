import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../../Services/auction.service';
import { CategoryService } from '../../../Admin/Services/category.service';
import { Pagination } from '../../Models/models/pagination.model';
import { Console } from 'console';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {
  activeAuctions: any[] = [];
  endedAuctions: any[] = [];
  categories: any[] = [];
  sortedAuctions:any[] =[];

  // Pagination properties
  pageActive: number = 1; 
  pageEnded: number = 1; 
  itemsPerPage: number = 4; 
  endedItemsPerPage: number = 6;
  totalItemsActive: number = 0;
  totalItemsEnded: number = 0;
    // Filter properties
  searchtxt: string = '';
  selectedCategory: string = ''; 
  sortOption: string = 'Id'; 
  isAscending: boolean = true;
  filterOption: string =''; 
  // sortCriteria: string = 'endingSoonest'

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
  toggleSortOrder(): void {
    this.isAscending = !this.isAscending; // Toggle the sort order
    this.loadActiveAuctions(); // Reload active auctions with new sort order
  }
  // Handle sort option changes
  updateSortOption(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Cast the target to HTMLSelectElement
    this.sortOption = selectElement.value; // Access the value property safely
    this.loadActiveAuctions(); // Reload active auctions with updated sort option
  }
  
    loadActiveAuctions(): void {
      this.auctionService.getPaginatedAuctions(
        this.searchtxt,
        this.sortOption,      // Sort by the selected field
        this.isAscending,     // Pass ascending/descending order
        this.itemsPerPage,
        this.pageActive,
        this.selectedCategory,
       this.filterOption
      ).subscribe({
        next: (pagination: Pagination<any[]>) => {
          this.activeAuctions = pagination.list || [];
          this.totalItemsActive = pagination.totalCount || 0;
          console.log(this.activeAuctions);
        },
        error: (err) => {
          console.error('Error fetching active auctions', err);
        }
      });
    }

  

  // Load ended auctions with sorting and pagination
  loadEndedAuctions(): void {
    this.auctionService.getPaginatedEndedAuctions(
      this.searchtxt,
      this.sortOption,
      this.isAscending,
      this.itemsPerPage,
      this.pageEnded,
      this.selectedCategory
    ).subscribe({
      next: (pagination: Pagination<any[]>) => {
        this.endedAuctions = pagination.list || [];
        this.totalItemsEnded = pagination.totalCount || 0;
        
        
      },
      error: (err) => {
        console.error('Error fetching ended auctions', err);
      }
    });
  }

  // Load categories for filtering
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

  // Handle category selection changes (if needed)
  onCategorySelect(category: string): void {
    this.selectedCategory = category;
    this.pageActive = 1;  // Reset to first page when category changes
    this.pageEnded = 1;
    this.loadActiveAuctions();
    this.loadEndedAuctions();
  }
      totalPagesActive(): number {
    return Math.ceil(this.totalItemsActive / this.itemsPerPage);
  }
  onActivePageChange(newPageActive: number): void {
    console.log('Active Page changed to:', newPageActive);
    if (newPageActive > 0 && newPageActive <= this.totalPagesActive()) {
      this.pageActive = newPageActive;
      this.loadActiveAuctions();
    }
  }

  // CategoryAuctionCount(category:string):number{

// return this.activeAuctions.filter(i=>i.c=category).length
// }
}
