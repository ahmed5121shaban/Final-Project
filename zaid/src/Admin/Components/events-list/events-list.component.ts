import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SortType } from '@swimlane/ngx-datatable';
import { PaginationInstance } from 'ngx-pagination'; // إضافة

interface Event {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  category: string;
  imageUrl: string;
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
    { id: 2, name: 'Tech Fair', description: 'A fair displaying the latest tech gadgets.', startDate: new Date('2024-10-15'), endDate: new Date('2024-10-20'), category: 'Electronics', imageUrl: 'assets/images/tech_fair.jpg' },
    { id: 3, name: 'Food Festival', description: 'A festival celebrating various cuisines.', startDate: new Date('2024-11-10'), endDate: new Date('2024-11-12'), category: 'Food', imageUrl: 'assets/images/food_festival.jpg' },
    { id: 4, name: 'Cultural Event', description: 'A celebration of local culture.', startDate: new Date('2024-12-01'), endDate: new Date('2024-12-05'), category: 'Culture', imageUrl: 'assets/images/cultural_event.jpg' },
    { id: 5, name: 'Sports Day', description: 'An event for sports enthusiasts.', startDate: new Date('2024-12-15'), endDate: new Date('2024-12-17'), category: 'Sports', imageUrl: 'assets/images/sports_day.jpg' },
    { id: 6, name: 'Music Festival', description: 'A festival for music lovers.', startDate: new Date('2024-12-20'), endDate: new Date('2024-12-22'), category: 'Music', imageUrl: 'assets/images/music_festival.jpg' },
  ];

  filteredEvents: Event[] = [];
  currentPageEvents: Event[] = [];
  currentPage = 1;
  pageSize = 3;
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
    this.currentPage = page;
    this.calculatePagination();
  }

  calculatePagination(): void {
    this.currentPageEvents = this.filteredEvents.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
  }
  get totalPages(): number {
    return Math.ceil(this.filteredEvents.length / this.pageSize);
  }
  
  
}
