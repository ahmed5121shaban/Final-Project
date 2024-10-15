import { Component, OnInit } from '@angular/core';
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

  constructor(private fb: FormBuilder, private complaintService: ComplaintService) {
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
    this.complaintService.getSellers().subscribe(sellers => {
      this.sellers = sellers;
    });
  }

  // معالجة تغيير البائع
  onSellerChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // تحويل EventTarget إلى HTMLSelectElement
    const sellerId = selectElement.value; // الحصول على sellerId
    this.complainForm.patchValue({ sellerId });
  }

  // إرسال الشكوى
  onSubmit(): void {
    if (this.complainForm.valid) {
      const complaintData = this.complainForm.value;
      this.complaintService.addComplaint(complaintData).subscribe(response => {
        // التعامل مع الاستجابة بعد إضافة الشكوى
        console.log('Complaint submitted:', response);
      });
    }
  }
}
