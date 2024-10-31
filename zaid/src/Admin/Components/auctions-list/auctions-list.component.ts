import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { AdminAuctionsService } from '../../Services/admin-auctions.service';
import { Pagination } from '../../../Action/Models/models/pagination.model';

interface Category {
  id: number;
  name: string;
  image: string;
  description: string;
  icon?: string | null; // Assuming it could be null or undefined
}

interface Seller {
  userID: string;
  user: {
    name: string; 
  };
  items: any[]; // Adjust this type based on the items structure
  reviews: any[]; // Adjust this type based on the reviews structure
  chats: any[]; // Adjust this type based on the chats structure
}

interface Item {
  id: number;
  name: string;
  description: string;
  images: Array<{ src: string }>; // Adjust the src property as per your image structure
  categoryID: number;
  category: Category;
  sellerID: string;
  seller: Seller;
  // Add other relevant properties from your item object
}



@Component({
  selector: 'app-auctions-list',
  templateUrl: './auctions-list.component.html',
  styleUrls: ['./auctions-list.component.css']
})
export class AuctionsListComponent implements OnInit {

  activeAuctions: any[] = [];
  
  // Pagination properties
  pageActive: number = 1; 
  itemsPerPage: number = 6; 
  totalItemsActive: number = 0;
  
  // Calculate total pages
  get totalPages(): number {
    return Math.ceil(this.totalItemsActive / this.itemsPerPage);
  }

  // Filter properties
  searchtxt: string = '';
  selectedCategory: string = ''; 
  sortOption: string = 'Id'; 
  isAscending: boolean = false;
  filterOption: string = ''; 
  searchForm: FormGroup;
  
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder, 
    private auctionService: AdminAuctionsService
  ) {
    this.searchForm = this.fb.group({
      name: [''],
      startDate: [''],
      endDate: [''],
      status: [''],
      sellerName: [''],
      paymentStatus: ['']
    });
  }

  ngOnInit(): void {
    this.loadAuctions();
  }

  loadAuctions(): void {
    this.auctionService.getPaginatedAuctions(
      this.searchtxt,
      this.sortOption,     
      this.isAscending,     
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

  updateSortOption(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.filterOption = selectElement.value; 
    this.loadAuctions(); 
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchtxt = inputElement.value; 
    this.loadAuctions(); 
  }
 
  onPageChange(page: number): void {
    this.pageActive = page; 
    this.loadAuctions(); 
  }
}
