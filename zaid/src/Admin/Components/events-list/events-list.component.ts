import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SortType } from '@swimlane/ngx-datatable';

interface Event {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  category: string;
   imageUrl: string;
}

interface Auction {
  title: string;
  status: 'Open' | 'Closed';
  category: string;
}

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('datatable', { static: false }) datatable: ElementRef | undefined;

  events: Event[] = [
    { id: 1, name: 'Art Exhibition', description: 'An exhibition showcasing local artwork.', startDate: new Date('2024-09-01'), endDate: new Date('2024-09-05'), category: 'Art', imageUrl: 'assets/images/art_exhibition.jpg' },
    { id: 2, name: 'Tech Fair', description: 'A fair displaying the latest tech gadgets.', startDate: new Date('2024-10-15'), endDate: new Date('2024-10-20'), category: 'Electronics' , imageUrl: 'assets/images/tech_fair.jpg'},
    // Added for example
    { id: 3, name: 'Food Festival', description: 'A festival celebrating various cuisines.', startDate: new Date('2024-11-10'), endDate: new Date('2024-11-12'), category: 'Food' , imageUrl: 'assets/images/food_festival.jpg'},
  ];

  auctions: Auction[] = [
    { title: 'Painting Auction', status: 'Open', category: 'Art' },
    { title: 'Gadget Auction', status: 'Closed', category: 'Electronics' }
    // Add more auctions here
  ];

  filteredEvents: Event[] = [];
  currentPageEvents: Event[] = [];
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
      category: ['']
    });
  }

  ngOnInit(): void {
    this.filteredEvents = [...this.events];
    this.calculatePagination();

    this.searchForm.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.filterEvents();
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
        console.log('Element dimensions:', rect);
      } else {
        console.error('getBoundingClientRect is not available');
      }
    }
  }

  filterEvents(): void {
    const { name, startDate, endDate, category } = this.searchForm.value;

    this.filteredEvents = this.events.filter(event => {
      const matchesName = name ? event.name.toLowerCase().includes(name.toLowerCase()) : true;
      const matchesStartDate = startDate ? (event.startDate ? new Date(event.startDate) >= new Date(startDate) : false) : true;
      const matchesEndDate = endDate ? (event.endDate ? new Date(event.endDate) <= new Date(endDate) : false) : true;
      const matchesCategory = category ? event.category === category : true;

      return matchesName && matchesStartDate && matchesEndDate && matchesCategory;
    });

    this.currentPage = 1;
    this.calculatePagination();
  }

  onSort(event: any): void {
    const sortColumn = event.sorts[0].prop as keyof Event;
    const sortDirection = event.sorts[0].dir === 'asc' ? 1 : -1;

    this.filteredEvents.sort((a, b) => {
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

  onPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.calculatePagination();
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredEvents.length / this.pageSize);
    this.currentPageEvents = this.filteredEvents.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
  }

  getOpenAuctions(category: string): Auction[] {
    return this.auctions.filter(auction => auction.category === category && auction.status === 'Open');
  }
}
