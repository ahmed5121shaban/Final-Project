import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SortType } from '@swimlane/ngx-datatable';

interface Complaint {
  title: string;
  id: number;
  description: string;
  status: 'Open' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High';
  dateSubmitted?: Date;
  lastUpdated?: Date;
}

@Component({
  selector: 'app-complaints-list',
  templateUrl: './complaints-list.component.html',
  styleUrls: ['./complaints-list.component.css']
})
export class ComplaintsListComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('datatable', { static: false }) datatable: ElementRef | undefined;

  complaints: Complaint[] = [
    { title: 'Complaint 1', id: 1, description: 'Description of complaint 1', status: 'Open', priority: 'High', dateSubmitted: new Date('2024-01-01'), lastUpdated: new Date('2024-08-01') },
    { title: 'Complaint 2', id: 2, description: 'Description of complaint 2', status: 'Resolved', priority: 'Medium', dateSubmitted: new Date('2024-01-05'), lastUpdated: new Date('2024-08-02') },
    { title: 'Complaint 3', id: 3, description: 'Description of complaint 3', status: 'Closed', priority: 'Low', dateSubmitted: new Date('2024-02-01'), lastUpdated: new Date('2024-08-03') },
    { title: 'Complaint 4', id: 4, description: 'Description of complaint 4', status: 'Open', priority: 'High', dateSubmitted: new Date('2024-02-10'), lastUpdated: new Date('2024-08-04') },
    { title: 'Complaint 5', id: 5, description: 'Description of complaint 5', status: 'Resolved', priority: 'Medium', dateSubmitted: new Date('2024-03-01'), lastUpdated: new Date('2024-08-05') }
  ];

  filteredComplaints: Complaint[] = [];
  currentPageComplaints: Complaint[] = [];
  currentPage = 1;
  pageSize = 3;
  totalPages = 0;
  searchForm: FormGroup;
  sortType: SortType = SortType.single;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      title: [''],
      startDate: [''],
      endDate: [''],
      status: [''],
      priority: ['']
    });
  }

  ngOnInit(): void {
    this.filteredComplaints = [...this.complaints];
    this.calculatePagination();

    this.searchForm.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.filterComplaints();
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

  filterComplaints(): void {
    const { title, startDate, endDate, status, priority } = this.searchForm.value;

    this.filteredComplaints = this.complaints.filter(complaint => {
      const matchesTitle = title ? complaint.title.toLowerCase().includes(title.toLowerCase()) : true;
      const matchesStartDate = startDate ? (complaint.dateSubmitted ? new Date(complaint.dateSubmitted) >= new Date(startDate) : false) : true;
      const matchesEndDate = endDate ? (complaint.dateSubmitted ? new Date(complaint.dateSubmitted) <= new Date(endDate) : false) : true;
      const matchesStatus = status ? complaint.status === status : true;
      const matchesPriority = priority ? complaint.priority === priority : true;

      return matchesTitle && matchesStartDate && matchesEndDate && matchesStatus && matchesPriority;
    });

    this.currentPage = 1;
    this.calculatePagination();
  }

  onSort(event: any): void {
    const sortColumn = event.sorts[0].prop as keyof Complaint;
    const sortDirection = event.sorts[0].dir === 'asc' ? 1 : -1;

    this.filteredComplaints.sort((a, b) => {
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
    this.totalPages = Math.ceil(this.filteredComplaints.length / this.pageSize);
    this.currentPageComplaints = this.filteredComplaints.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
  }
}
