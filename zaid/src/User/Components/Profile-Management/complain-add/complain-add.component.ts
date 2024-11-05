import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplaintService } from '../../../Services/complaint.service';
import { Seller } from '../../../interface/seller';
import { AuthService } from '../../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-complain-add',
  templateUrl: './complain-add.component.html',
  styleUrls: ['./complain-add.component.css']
})
export class ComplainAddComponent implements OnInit {
  complainForm: FormGroup;
  sellers: Seller[] = [];

  constructor(
    private fb: FormBuilder,
    private complaintService: ComplaintService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    // إعداد النموذج مع التحقق من المدخلات
    this.complainForm = this.fb.group({
      sellerId: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSellers();
  }

  // تحميل قائمة البائعين
  loadSellers(): void {
    this.complaintService.getSellers().subscribe({
      next: (sellers) => {
        this.sellers = sellers;
        this.cdr.detectChanges();
      },
      error: (err) => {
        if (err.status === 401) {
          this.toastr.error('Unauthorized access. Please login.', 'Error');
        } else {
          this.toastr.error('Error fetching sellers. Please try again later.', 'Error');
        }
      }
    });
  }

  // تحديث sellerId عند تغيير الاختيار
  onSellerChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const sellerId = selectElement.value;
    this.complainForm.patchValue({ sellerId });
  }

  // إرسال الشكوى
  onSubmit(): void {
    if (this.complainForm.valid) {
      this.complaintService.addComplaint(this.complainForm.value).subscribe({
        next: () => {
          this.toastr.success('Complaint submitted successfully!', 'Success');
          this.complainForm.reset();
        },
        error: (error) => {
          console.error('Detailed error:', error);
          if (error.message === "User ID is missing.") {
            this.toastr.error('User ID is missing. Please login again.', 'Error');
          } else if (error.status === 401) {
            this.toastr.error('Unauthorized. Please login.', 'Error');
          } else if (error.status === 400) {if (error.error === "لم يتم العثور على دفع مكتمل أو تم إدخال بيانات غير صحيحة.") {
            this.toastr.error('Please complete payment or check your shipping state or review your data. ');
          } else 
            this.toastr.error('Bad Request. Please check your input data.', 'Error');
          } else {
            this.toastr.error('Error submitting complaint', 'Error');
          }
        }
      });
    }
  }
}
