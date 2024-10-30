import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../Services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserProfileGet } from '../../../interface/user-profile.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.css']
})
export class ProfileSettingComponent implements OnInit {
  form: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      FirstName: ['', [Validators.minLength(3), Validators.maxLength(15)]],
      LastName: ['', [Validators.minLength(3), Validators.maxLength(15)]],
      Email: ['', [Validators.email]],
      TimeZone: [''],
      Age: [''],
      Gender: [''],
      Description: [''],
      Currency: [''],
      PhoneNumbers: this.formBuilder.array([
        this.formBuilder.control('', [Validators.minLength(4), Validators.maxLength(30)]),
      ]),
    });



  }

  get PhoneNumbers():FormArray  {
    return this.form.get('PhoneNumbers') as FormArray;
  }

  addPhoneNumber() {
    const phoneNumbersArray = this.form.get('PhoneNumbers') as FormArray;
    phoneNumbersArray.push(this.formBuilder.control('', [Validators.minLength(4), Validators.maxLength(30)]));
}

removePhoneNumber(index: number) {
    const phoneNumbersArray = this.form.get('PhoneNumbers') as FormArray;
    phoneNumbersArray.removeAt(index);
}

  ngOnInit() {
    this.apiService.getProfileData().pipe(
      map((data: any) => {
        const [firstName, lastName] = data.firstName?.split(" ") || ["", ""]; // تعديل هنا
  
        return {
          FirstName: firstName || '',  // استخدم firstName من البيانات
          LastName: lastName || '',     // استخدم lastName من البيانات
          Email: data.email,
          TimeZone: data.timeZone,
          Age: data.age,
          Gender: data.gender,
          Description: data.description,
          Currency: data.currency,
          PhoneNumbers: data.phoneNumbers,
          ProfileImage: data.profileImage
        };
      })
    ).subscribe({
      next: (data: UserProfileGet) => {
        this.form.patchValue({
          FirstName: data.FirstName,  // استخدم FirstName من التقسيم
          LastName: data.LastName,    // استخدم LastName من التقسيم
          Email: data.Email,
          TimeZone: data.TimeZone,
          Age: data.Age,
          Gender: data.Gender,
          Description: data.Description,
          Currency: data.Currency
        });
  
        // إعدادات أرقام الهاتف
        this.PhoneNumbers.clear();
        (data.PhoneNumbers || ['']).forEach((phone: string) => {
          this.PhoneNumbers.push(this.formBuilder.control(phone.trim(), [Validators.minLength(4), Validators.maxLength(30)]));
        });
  
        if (data.ProfileImage) {
          this.selectedFile = data.ProfileImage;
        }
  
        console.log('Form values after patch:', this.form.value);
      },
      error: (error: any) => {
        console.error('Error fetching profile data:', error);
      }
    });
  }
  
  
  
  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      
      this.form.patchValue({ ProfileImage: this.selectedFile });
    }
  }

  editProfile() {
    const formData = new FormData();
  
    // أضف القيم إلى FormData مع التحقق من القيم الفارغة
    formData.append('FirstName', this.form.get('FirstName')?.value || '');
    formData.append('LastName', this.form.get('LastName')?.value || '');
    formData.append('Email', this.form.get('Email')?.value || '');
    formData.append('TimeZone', this.form.get('TimeZone')?.value || '');
    formData.append('Age', this.form.get('Age')?.value || '');
    formData.append('Gender', this.form.get('Gender')?.value || '');
    formData.append('Description', this.form.get('Description')?.value || '');
    formData.append('Currency', this.form.get('Currency')?.value || '');
  
    this.PhoneNumbers.value.forEach((phone: string, index: number) => {
      formData.append(`PhoneNumbers[${index}]`, phone || ''); // التعامل مع الأرقام الفارغة
    });
  
    if (this.selectedFile) {
      formData.append('ProfileImage', this.selectedFile);
    }
  
    this.apiService.updateProfile(formData).subscribe({
      next: (response: any) => {
        this.toastr.success('Profile updated successfully!');
        this.router.navigate(['/user/profile']);
      },
      error: (error: any) => {
        console.error('Error updating profile:', error);
        this.toastr.error('An error occurred while updating the profile.');
      }
    });
  }

}

