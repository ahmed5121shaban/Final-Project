import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SortType } from '@swimlane/ngx-datatable';
import { PaginationInstance } from 'ngx-pagination';
import { EventService } from '../../Services/event.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../Services/category.service';

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

  events: Event[] = [];
  filteredEvents: Event[] = [];
  currentPageEvents: Event[] = [];
  currentPage = 1;
  pageSize = 3;
  searchForm: FormGroup;
  sortType: SortType = SortType.single;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  categories: any;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private toaster: ToastrService,
    private categoryService: CategoryService
  ) {
    this.searchForm = this.fb.group({
      name: [''],
      startDate: [''],
      endDate: [''],
      category: ['All']
    });
  }

  ngOnInit(): void {
    this.getAllEvent();
    this.getAllCategory();
    this.searchForm.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.filterEvents();
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
      const matchesStartDate = startDate ? new Date(event.startDate) >= new Date(startDate) : true;
      const matchesEndDate = endDate ? new Date(event.endDate) <= new Date(endDate) : true;
      const matchesCategory = category && category !== 'All' ? event.category === category : true;

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

  getAllEvent() {
    this.eventService.GetAllEvent().subscribe({
      next: (res: any) => {
        console.log(res);

        this.events = res.result.map((element: any) => ({
          id: element.id,
          name: element.title,
          description: element.description,
          startDate: element.startDate,
          endDate: element.endDate,
          category: element.type,
          imageUrl: element.image
        }));
        this.filteredEvents = [...this.events];
        this.calculatePagination();
      },
      error: (err) => {
        this.toaster.warning(err);
      }
    });
  }

  getAllCategory() {
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res;
        console.log(res);
      },
      error: (err) => {
        this.toaster.error(err);
      }
    });
  }
}
