import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SortType } from '@swimlane/ngx-datatable';
import { PaginationInstance } from 'ngx-pagination'; // إضافة
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
  categories:any

  constructor(private fb: FormBuilder,private eventService:EventService,private toaster:ToastrService,
    private categoryService:CategoryService) {
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
    this.getAllEvent();
    this.getAllCategory();
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
      //هنا السطريين دول بيضربو ايرورر
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

  getAllEvent(){
    this.eventService.GetAllEvent().subscribe({
      next:(res:any)=>{
        res.result.forEach((element:any) => {
          this.events.push({
            id: element.id,
            name: element.title,
            description: element.description,
            startDate: element.startDate,
            endDate: element.endDate,
            category: element.type,
            imageUrl: element.image
          })
        });
        console.log(this.events);

      },
      error:(err)=>{
        this.toaster.warning(err,"not event add")
      }
    })
  }

  getAllCategory(){
    this.categoryService.getCategories().subscribe({
      next:(res:any)=>{this.categories=res;console.log(res);
      }
    })
  }

}
