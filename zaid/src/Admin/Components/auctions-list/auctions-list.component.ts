import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { AdminAuctionsService } from '../../Services/admin-auctions.service';
import { CategoryService } from '../../Services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from '../../../Action/Models/models/pagination.model';

interface Auction {
  name: string;
  id: number;
  status: 'Open' | 'Closed' | 'Live';
  liveUrl?: string;
  imageUrl?: string;
  startDate?: Date;
  endDate?: Date;
  sellerName?: string;
  paymentStatus?: 'Paid' | 'Unpaid';
}

@Component({
  selector: 'app-auctions-list',
  templateUrl: './auctions-list.component.html',
  styleUrls: ['./auctions-list.component.css']
})
export class AuctionsListComponent implements OnInit {

  @ViewChild('datatable', { static: false }) datatable: ElementRef | undefined;

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
    private auctionService: AdminAuctionsService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
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
    const selectElement = event.target as HTMLSelectElement;
    this.searchtxt = selectElement.value; 
    this.loadAuctions(); 
  }
 
  onPageChange(page: number): void {
    this.pageActive = page; // Update current page
    this.loadAuctions(); // Reload data based on the current page
  }
}