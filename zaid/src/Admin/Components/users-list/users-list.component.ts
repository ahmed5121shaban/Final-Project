import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService, User } from '../../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  allUsers: User[] = [];
  users: User[] = [];
  totalUsers = 0;
  currentPage = 1;
  pageSize = 5;
  searchForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      name: [''],
      email: [''],
      role: ['']
    });
  }

  ngOnInit(): void {
    this.loadAllUsers();

    this.searchForm.valueChanges.subscribe(() => {
      this.currentPage = 1;
      this.applyFilterAndPagination();
    });
  }

  loadAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data: any) => {
        console.log('Received data:', data);
        this.allUsers = data.users;
        this.applyFilterAndPagination();
      },
      error: (err) => {
        console.error('Error loading users:', err);
      }
    });
  }

  applyFilterAndPagination(): void {
    const { name, email, role } = this.searchForm.value;
    const filteredUsers = this.allUsers
      .filter(user =>
        user.name.toLowerCase().includes(name.toLowerCase()) &&
        user.email.toLowerCase().includes(email.toLowerCase()) &&
        (role ? user.role.toLowerCase() === role.toLowerCase() : true)
      )
      .map((user, index) => ({
        ...user,
        displayId: index + 1 // تعيين displayId بناءً على ترتيب `index` بدون إضافة أي شيء
      }));
  
    this.totalUsers = filteredUsers.length;
    this.users = filteredUsers.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
  
    console.log('Filtered Users:', this.users); // تابع بيانات التصفية والصفحات هنا
  }
  

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyFilterAndPagination();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalUsers / this.pageSize);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  viewProfile(user: User) {
    if (user && user.id) {
      const userId = user.id;
      console.log('User ID:', userId);
      this.router.navigate(['/admin/profile-review', userId]);
    } else {
      console.error('User or User ID is undefined or null');
    }
  }
}
