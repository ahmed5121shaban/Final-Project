import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplaintService } from '../../../Services/complaint.service'; 
import { Seller } from '../../../interface/seller'; 

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
    private cdr: ChangeDetectorRef
  ) {
    this.complainForm = this.fb.group({
      sellerId: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSellers();
  }

  loadSellers(): void {
    this.complaintService.getSellers().subscribe({
      next: (sellers) => {
        this.sellers = sellers;
        this.cdr.detectChanges(); // إعادة التحقق من التغييرات
      },
      error: (err) => {
        if (err.status === 401) {
          console.error('Unauthorized access. Please login.');
          // عرض رسالة أو إعادة توجيه المستخدم
        } else {
          console.error('Error loading sellers', err);
        }
      }
    });
  }

  onSellerChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const sellerId = selectElement.value;
    this.complainForm.patchValue({ sellerId });
  }

  onSubmit(): void {
    if (this.complainForm.valid) {
      const complaintData = this.complainForm.value;
      this.complaintService.addComplaint(complaintData).subscribe(response => {
        console.log('Complaint submitted:', response);
      }, error => {
        console.error('Error submitting complaint', error);
      });
    }
  }
}
