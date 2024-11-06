import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../Services/api.service';
import { ToastrService } from 'ngx-toastr'; // استيراد خدمة التوستر
import { Router } from '@angular/router'; // استيراد الـ Router

@Component({
  selector: 'app-verify-identity',
  templateUrl: './verify-identity.component.html',
  styleUrls: ['./verify-identity.component.css']
})
export class VerifyIdentityComponent implements OnInit {
  form: FormGroup;
  nationalIdFrontImageFile: File | null = null; // Store the front image file
  nationalIdBackImageFile: File | null = null;  // Store the back image file
  nationalIdFrontImageUrl: string | null = null; // URL for front image preview
  nationalIdBackImageUrl: string | null = null;  // URL for back image preview

  constructor(
    private formBuilder: FormBuilder, 
    private apiService: ApiService,
    private toastr: ToastrService, // إضافة التوستر
    private router: Router // إضافة الـ Router
  ) {
    this.form = this.formBuilder.group({
      // firstName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      // lastName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      // BarthDate: ['', [Validators.required]],
      // idNumber: ['', [Validators.required, Validators.maxLength(20)]],
      nationalIdFrontImage: [null, [Validators.required]],
      nationalIdBackImage: [null, [Validators.required]]
    });
  }

  // get firstName() { return this.form.get('firstName'); }
  // get lastName() { return this.form.get('lastName'); }
  // get BarthDate() { return this.form.get('BarthDate'); }
  // get idNumber() { return this.form.get('idNumber'); }

  ngOnInit() {}

  addID() {
    if (this.form.valid) {
      const formData = new FormData();
      // const birthDate = new Date(this.form.get('BarthDate')?.value);
      // const formattedDate = `${birthDate.getFullYear()}-${String(birthDate.getMonth() + 1).padStart(2, '0')}-${String(birthDate.getDate()).padStart(2, '0')}`;
  
      // formData.append('FirstName', this.form.get('firstName')?.value);
      // formData.append('LastName', this.form.get('lastName')?.value);
      // formData.append('BarthDate', formattedDate);
      // formData.append('IdNumber', this.form.get('idNumber')?.value);

      if (this.nationalIdFrontImageFile) {
        formData.append('NationalIdFrontImage', this.nationalIdFrontImageFile);
      }
      if (this.nationalIdBackImageFile) {
        formData.append('NationalIdBackImage', this.nationalIdBackImageFile);
      }

      this.apiService.verifyIdentity(formData).subscribe({
        next: (response: any) => {
          // عرض رسالة النجاح باستخدام التوستر
          this.toastr.success('Identity verified successfully');

          // التوجيه إلى صفحة user/profile بعد النجاح
          this.router.navigate(['/user/profile']);
        },
        error: (error: any) => {

        }
      });
    } else {
      console.error('Form is not valid');
    }
  }

  onNationalIdFrontImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.nationalIdFrontImageFile = file;
      this.nationalIdFrontImageUrl = URL.createObjectURL(file); // إنشاء رابط للصورة
      this.form.patchValue({ nationalIdFrontImage: file });
    }
  }

  onNationalIdBackImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.nationalIdBackImageFile = file;
      this.nationalIdBackImageUrl = URL.createObjectURL(file); // إنشاء رابط للصورة
      this.form.patchValue({ nationalIdBackImage: file });
    }
  }
}
