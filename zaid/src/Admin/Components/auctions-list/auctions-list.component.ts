import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SortType } from '@swimlane/ngx-datatable';

 interface Auction {
  name: string;
  id: number;
  quantity: number;
  status: 'Open' | 'Closed' | 'Live';
  dailySale: number;
  sold: number;
  inStock: number;
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
export class AuctionsListComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('datatable', { static: false }) datatable: ElementRef | undefined;

  auctions: Auction[] = [
    { name: 'Auction 1', id: 1, quantity: 10, status: 'Open', dailySale: 5, sold: 2, inStock: 8, imageUrl: 'assets/auction1.jpg', startDate: new Date('2024-01-01'), endDate: new Date('2024-01-10'), sellerName: 'Seller 1', paymentStatus: 'Paid' },
    { name: 'Auction 2', id: 2, quantity: 20, status: 'Closed', dailySale: 8, sold: 15, inStock: 5, imageUrl: 'assets/auction2.jpg', startDate: new Date('2024-01-05'), endDate: new Date('2024-01-15'), sellerName: 'Seller 2', paymentStatus: 'Unpaid' },
    { name: 'Auction 3', id: 3, quantity: 30, status: 'Live', dailySale: 10, sold: 25, inStock: 15, liveUrl: 'https://liveauction.com/auction3', imageUrl: 'assets/auction3.jpg', startDate: new Date('2024-02-01'), endDate: new Date('2024-02-10'), sellerName: 'Seller 3', paymentStatus: 'Paid' },
    { name: 'Auction 4', id: 4, quantity: 40, status: 'Open', dailySale: 12, sold: 8, inStock: 32, imageUrl: 'assets/auction4.jpg', startDate: new Date('2024-02-10'), endDate: new Date('2024-02-20'), sellerName: 'Seller 4', paymentStatus: 'Unpaid' },
    { name: 'Auction 5', id: 5, quantity: 50, status: 'Closed', dailySale: 15, sold: 20, inStock: 30, imageUrl: 'assets/auction5.jpg', startDate: new Date('2024-03-01'), endDate: new Date('2024-03-10'), sellerName: 'Seller 5', paymentStatus: 'Paid' },
    { name: 'Auction 6', id: 6, quantity: 60, status: 'Live', dailySale: 20, sold: 30, inStock: 30, liveUrl: 'https://liveauction.com/auction6', imageUrl: 'assets/auction6.jpg', startDate: new Date('2024-03-15'), endDate: new Date('2024-03-25'), sellerName: 'Seller 6', paymentStatus: 'Unpaid' },
    { name: 'Auction 7', id: 7, quantity: 70, status: 'Open', dailySale: 25, sold: 10, inStock: 60, imageUrl: 'assets/auction7.jpg', startDate: new Date('2024-04-01'), endDate: new Date('2024-04-10'), sellerName: 'Seller 7', paymentStatus: 'Paid' },
    { name: 'Auction 8', id: 8, quantity: 80, status: 'Closed', dailySale: 30, sold: 40, inStock: 40, imageUrl: 'assets/auction8.jpg', startDate: new Date('2024-04-15'), endDate: new Date('2024-04-25'), sellerName: 'Seller 8', paymentStatus: 'Unpaid' },
    { name: 'Auction 9', id: 9, quantity: 90, status: 'Live', dailySale: 35, sold: 50, inStock: 40, liveUrl: 'https://liveauction.com/auction9', imageUrl: 'assets/auction9.jpg', startDate: new Date('2024-05-01'), endDate: new Date('2024-05-10'), sellerName: 'Seller 9', paymentStatus: 'Paid' },
    { name: 'Auction 10', id: 10, quantity: 100, status: 'Open', dailySale: 40, sold: 20, inStock: 80, imageUrl: 'assets/auction10.jpg', startDate: new Date('2024-05-15'), endDate: new Date('2024-05-25'), sellerName: 'Seller 10', paymentStatus: 'Unpaid' }
  ];

  filteredAuctions: Auction[] = [];
  currentPageAuctions: Auction[] = [];
  currentPage = 1;
  pageSize = 3;
  totalPages = 0;
  searchForm: FormGroup;
  sortType: SortType = SortType.single;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder) {
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
    this.filteredAuctions = [...this.auctions];
    this.calculatePagination();

    this.searchForm.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.filterAuctions();
        this.calculatePagination();
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngAfterViewInit(): void {
    if (this.datatable && this.datatable.nativeElement) {
      const element = this.datatable.nativeElement as HTMLElement;
      if (element.getBoundingClientRect) {
        const rect = element.getBoundingClientRect();
        console.log(rect);
      } else {
        console.error('getBoundingClientRect is not available');
      }
    }
  }

  filterAuctions(): void {
    const { name, startDate, endDate, status, sellerName, paymentStatus } = this.searchForm.value;

    this.filteredAuctions = this.auctions.filter(auction => {
      const matchesName = name ? auction.name.toLowerCase().includes(name.toLowerCase()) : true;
      const matchesStartDate = startDate ? (auction.startDate ? new Date(auction.startDate) >= new Date(startDate) : false) : true;
      const matchesEndDate = endDate ? (auction.endDate ? new Date(auction.endDate) <= new Date(endDate) : false) : true;
      const matchesStatus = status ? auction.status === status : true;
      const matchesSellerName = sellerName ? auction.sellerName?.toLowerCase().includes(sellerName.toLowerCase()) : true;
      const matchesPaymentStatus = paymentStatus ? auction.paymentStatus === paymentStatus : true;

      return matchesName && matchesStartDate && matchesEndDate && matchesStatus && matchesSellerName && matchesPaymentStatus;
    });

    this.currentPage = 1;
    this.calculatePagination();
  }

  onSort(event: any): void {
    const sortColumn = event.sorts[0].prop as keyof Auction;
    const sortDirection = event.sorts[0].dir === 'asc' ? 1 : -1;

    this.filteredAuctions.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue === undefined || bValue === undefined) {
        return 0;
      }

      if (aValue < bValue) return -1 * sortDirection;
      if (aValue > bValue) return 1 * sortDirection;
      return 0;
    });

    this.calculatePagination();
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredAuctions.length / this.pageSize);
    this.currentPageAuctions = this.filteredAuctions.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
  }

  onPage(page: number): void {
    this.currentPage = page;
    this.calculatePagination();
  }

  goToLiveAuction(url: string | undefined): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
