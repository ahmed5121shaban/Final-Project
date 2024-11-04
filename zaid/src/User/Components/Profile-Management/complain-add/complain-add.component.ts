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
    this.complainForm = this.fb.group({
      buyerId: ['', Validators.required],
      sellerId: ['', Validators.required],
      reason: ['', Validators.required]
  
    });
  }

  ngOnInit(): void {
    this.complainForm.patchValue({ buyerId: this.authService.getCurrentUserId() });
    this.loadSellers();
  }

  loadSellers(): void {
    this.complaintService.getSellers().subscribe({
      next: (sellers) => {
        this.sellers = sellers;
        this.cdr.detectChanges();
      },
      error: (err) => {
        if (err.status === 401) {
          this.toastr.error('Unauthorized access. Please login.', 'Error');
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
      this.complaintService.addComplaint(complaintData).subscribe(
        response => {
          this.toastr.success('Complaint submitted successfully!', 'Success');
          console.log('Complaint submitted:', response);
        },
        error => {
          if (error.status === 400) {
            this.toastr.error('Bad Request. Please check your input data.', 'Error');
          } else {
            this.toastr.error('Error submitting complaint', 'Error');
          }
          console.error('Error submitting complaint', error);
        }
      );
    }
  }
}
