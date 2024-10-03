import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SortType } from '@swimlane/ngx-datatable';
import { isPlatformBrowser } from '@angular/common';

interface User {
  name: string;
  id: number;
  email: string;
  status: 'Active' | 'Inactive';
  registeredDate?: Date;
  lastLogin?: Date;
  role?: string;
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('datatable', { static: false }) datatable: ElementRef | undefined;

  users: User[] = [
    { name: 'User 1', id: 1, email: 'user1@example.com', status: 'Active', registeredDate: new Date('2024-01-01'), lastLogin: new Date('2024-08-01'), role: 'Admin' },
    { name: 'User 2', id: 2, email: 'user2@example.com', status: 'Inactive', registeredDate: new Date('2024-01-05'), lastLogin: new Date('2024-08-02'), role: 'User' },
    { name: 'User 3', id: 3, email: 'user3@example.com', status: 'Active', registeredDate: new Date('2024-02-01'), lastLogin: new Date('2024-08-03'), role: 'User' },
    { name: 'User 4', id: 4, email: 'user4@example.com', status: 'Inactive', registeredDate: new Date('2024-02-10'), lastLogin: new Date('2024-08-04'), role: 'Admin' },
    { name: 'User 5', id: 5, email: 'user5@example.com', status: 'Active', registeredDate: new Date('2024-03-01'), lastLogin: new Date('2024-08-05'), role: 'User' }
  ];

  filteredUsers: User[] = [];
  currentPageUsers: User[] = [];
  currentPage = 1;
  pageSize = 3;
  totalPages = 0;
  searchForm: FormGroup;
  sortType: SortType = SortType.single;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object) {
    this.searchForm = this.fb.group({
      name: [''],
      startDate: [''],
      endDate: [''],
      status: [''],
      email: [''],
      role: ['']
    });
  }

  ngOnInit(): void {
    this.filteredUsers = [...this.users];
    this.calculatePagination();

    this.searchForm.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.filterUsers();
        this.calculatePagination();
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngAfterViewInit(): void {
    if (this.datatable?.nativeElement) {
      const element = this.datatable.nativeElement as HTMLElement;
      if (element.getBoundingClientRect) {
        const rect = element.getBoundingClientRect();
        console.log('Element dimensions:', rect);
      } else {
        console.error('getBoundingClientRect is not available');
      }
    }
  }

  filterUsers(): void {
    const { name, startDate, endDate, status, email, role } = this.searchForm.value;

    this.filteredUsers = this.users.filter(user => {
      const matchesName = name ? user.name.toLowerCase().includes(name.toLowerCase()) : true;
      const matchesStartDate = startDate ? (user.registeredDate ? new Date(user.registeredDate) >= new Date(startDate) : false) : true;
      const matchesEndDate = endDate ? (user.registeredDate ? new Date(user.registeredDate) <= new Date(endDate) : false) : true;
      const matchesStatus = status ? user.status === status : true;
      const matchesEmail = email ? user.email.toLowerCase().includes(email.toLowerCase()) : true;
      const matchesRole = role ? user.role === role : true;

      return matchesName && matchesStartDate && matchesEndDate && matchesStatus && matchesEmail && matchesRole;
    });

    this.currentPage = 1; // Reset to the first page on filter
    this.calculatePagination();
  }

  onSort(event: any): void {
    const sortColumn = event.sorts[0].prop as keyof User;
    const sortDirection = event.sorts[0].dir === 'asc' ? 1 : -1;

    this.filteredUsers.sort((a, b) => {
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
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.currentPageUsers = this.filteredUsers.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
  }
}
