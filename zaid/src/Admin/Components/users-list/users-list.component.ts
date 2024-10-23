import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; // استيراد FormBuilder و FormGroup
import { UserService, User } from '../../Services/user.service';

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
  pageSize = 10;
  searchForm: FormGroup; // نموذج البحث

  constructor(private userService: UserService, private fb: FormBuilder) {
    // تهيئة نموذج البحث باستخدام FormBuilder
    this.searchForm = this.fb.group({
      name: [''],
      email: [''],
      role: ['']
    });
  }

  ngOnInit(): void {
    this.loadAllUsers();

    // تحديث الفلترة عند تغيير قيم نموذج البحث
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
    const { name, email, role } = this.searchForm.value; // استخراج القيم من نموذج البحث
    const filteredUsers = this.allUsers
      .map((user, index) => ({
        ...user,
        displayId: (this.currentPage - 1) * this.pageSize + index + 1
      }))
      .filter(user =>
        user.name.toLowerCase().includes(name.toLowerCase()) &&
        user.email.toLowerCase().includes(email.toLowerCase()) &&
        (role ? user.role.toLowerCase() === role.toLowerCase() : true)
      );

    this.totalUsers = filteredUsers.length;
    this.users = filteredUsers.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
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
}
