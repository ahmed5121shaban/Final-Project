import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; // استيراد FormBuilder و FormGroup
import { UserService, User } from '../../Services/user.service'; // استيراد UserService
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  allUsers: User[] = []; // مصفوفة لتخزين جميع المستخدمين
  users: User[] = []; // مصفوفة لتخزين المستخدمين المعروضين
  totalUsers = 0; // عدد المستخدمين
  currentPage = 1; // الصفحة الحالية
  pageSize = 10; // حجم الصفحة
  searchForm: FormGroup; // نموذج البحث

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
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
        this.allUsers = data.users; // حفظ جميع المستخدمين
        this.applyFilterAndPagination(); // تطبيق الفلترة والصفحات
      },
      error: (err) => {
        console.error('Error loading users:', err);
      }
    });
  }

  applyFilterAndPagination(): void {
    const { name, email, role } = this.searchForm.value; // استخراج القيم من نموذج البحث
    const filteredUsers = this.allUsers
      .filter(user =>
        user.name.toLowerCase().includes(name.toLowerCase()) &&
        user.email.toLowerCase().includes(email.toLowerCase()) &&
        (role ? user.role.toLowerCase() === role.toLowerCase() : true)
      )
      .map((user, index) => ({
        ...user,
        displayId: (this.currentPage - 1) * this.pageSize + index + 1
      }));

    this.totalUsers = filteredUsers.length; // عدد المستخدمين بعد الفلترة
    this.users = filteredUsers.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page; // تحديث الصفحة الحالية
      this.applyFilterAndPagination(); // إعادة تطبيق الفلترة والصفحات
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalUsers / this.pageSize); // حساب عدد الصفحات
  }

  trackByIndex(index: number, obj: any): any {
    return index; // تتبع الفهارس
  }

  viewProfile(user: User) {
    if (user && user.id) {
      const userId = user.id; // استخدام نفس id المستخدم من user.id
      console.log('User ID:', userId); // تحقق من قيمة userId
      this.router.navigate(['/admin/profile-review', userId]);
    } else {
      console.error('User or User ID is undefined or null');
    }
  }
  
}
