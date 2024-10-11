import { Component, OnInit } from '@angular/core';
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
  page: number = 1; // current page number
  itemsPerPage: number = 6; // items per page for active auctions
  endedItemsPerPage: number = 6; // items per page for ended auctions

  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 2;  // You can dynamically set this later
  constructor(
    private auctionService: AuctionService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.loadActiveAuctions(); 
    this.loadEndedAuctions();
    this.loadCategories();
    this.loadAuctions();

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

  loadAuctions(searchtxt: string = '', columnName: string = 'Id', isAscending: boolean = false): void {
    this.auctionService.getPaginatedAuctions(searchtxt, columnName, isAscending, this.pageSize, this.currentPage)
      .subscribe({
        next: (pagination: Pagination<any[]>) => {
          this.activeAuctions = pagination.list;
          this.totalItems = pagination.totalCount;
        },
        error: (err) => {
          console.error('Error fetching paginated auctions', err);
        }
      });
  }

  // Handle page change
  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadAuctions(); // Reload auctions for the new page
  }
}
// import { Component, OnInit } from '@angular/core';
// import { AuctionService } from '../../Services/auction.service';
// import { CategoryService } from '../../../Admin/Services/category.service';
// import { Pagination } from '../../Models/models/pagination.model';

// @Component({
//   selector: 'app-auction-list',
//   templateUrl: './auction-list.component.html',
//   styleUrls: ['./auction-list.component.css']
// })
// export class AuctionListComponent implements OnInit {
//   activeAuctions: any[] = [];
//   endedAuctions: any[] = [];
//   categories: any[] = [];
  
//   // Pagination properties
//   page: number = 1;
//   itemsPerPage: number = 6;
//   endedItemsPerPage: number = 6;
  
//   totalItems: number = 0;
//   currentPage: number = 1;
//   pageSize: number = 6;
//   selectedCategory: string = ''; // For category filter
//   sortOption: string = 'Ending Soonest'; // Default sorting option

//   constructor(
//     private auctionService: AuctionService,
//     private categoryService: CategoryService
//   ) {}

//   ngOnInit(): void {
//     this.loadCategories();
//     this.loadActiveAuctions();
//     this.loadEndedAuctions();
//   }

//   // Load active auctions with pagination and filters
//   loadActiveAuctions(): void {
//     this.auctionService.getPaginatedAuctions(this.selectedCategory, this.sortOption, false, this.pageSize, this.currentPage)
//       .subscribe({
//         next: (pagination: Pagination<any[]>) => {
//           this.activeAuctions = pagination.list;
//           this.totalItems = pagination.totalCount;
//         },
//         error: (err) => {
//           console.error('Error fetching active auctions', err);
//         }
//       });
//   }

//   // Load ended auctions
//   loadEndedAuctions(): void {
//     this.auctionService.getAllEnded().subscribe({
//       next: (data) => {
//         this.endedAuctions = data;
//       },
//       error: (err) => {
//         console.error('Error fetching ended auctions', err);
//       }
//     });
//   }

//   // Load categories
//   loadCategories(): void {
//     this.categoryService.getCategories().subscribe({
//       next: (data) => {
//         this.categories = data.result;
//       },
//       error: (err) => {
//         console.error('Error fetching categories', err);
//       }
//     });
//   }

//   // Handle page change
//   onPageChange(newPage: number): void {
//     this.currentPage = newPage;
//     this.loadActiveAuctions();
//   }

//   // Handle category selection for filtering
//   onCategorySelect(category: string): void {
//     this.selectedCategory = category;
//     this.loadActiveAuctions();
//   }

//   // Handle sorting option changes
//   onSortOptionChange(option: string): void {
//     this.sortOption = option;
//     this.loadActiveAuctions();
//   }
// }
