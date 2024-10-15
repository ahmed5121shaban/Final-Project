import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../Services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserProfileGet } from '../../../interface/user-profile.interface';

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
      FirstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      LastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      Email: ['', [Validators.required, Validators.email]],
      Street: ['', [Validators.required]],
      PostalCode: ['', [Validators.required]],
      City: ['', [Validators.required]],
      Country: ['', [Validators.required]],
      TimeZone: ['', [Validators.required]],
      Age: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Currency: ['', [Validators.required]],
      PhoneNumbers: this.formBuilder.array([
        this.formBuilder.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      ]),
    });
  }

  get PhoneNumbers() {
    return this.form.get('PhoneNumbers') as FormArray;
  }

  addPhoneNumber() {
    this.PhoneNumbers.push(this.formBuilder.control("", [Validators.required, Validators.minLength(4), Validators.maxLength(30)]));
  }

  removePhoneNumber(index: number) {
    this.PhoneNumbers.removeAt(index);
  }

  ngOnInit() {
    this.apiService.getProfileData().subscribe({
      next: (data: UserProfileGet) => {
        this.form.patchValue(data);
        console.log(data);
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
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('FirstName', this.form.get('FirstName')?.value);
      formData.append('LastName', this.form.get('LastName')?.value);
      formData.append('Email', this.form.get('Email')?.value);
      formData.append('Street', this.form.get('Street')?.value);
      formData.append('PostalCode', this.form.get('PostalCode')?.value);
      formData.append('City', this.form.get('City')?.value);
      formData.append('Country', this.form.get('Country')?.value);
      formData.append('TimeZone', this.form.get('TimeZone')?.value);
      formData.append('Age', this.form.get('Age')?.value);
      formData.append('Gender', this.form.get('Gender')?.value);
      formData.append('Description', this.form.get('Description')?.value);
      formData.append('Currency', this.form.get('Currency')?.value);
      this.PhoneNumbers.value.forEach((phone: string, index: number) => {
        formData.append(`PhoneNumbers[${index}]`, phone);
      });
      
      if (this.selectedFile) {
        formData.append('ProfileImage', this.selectedFile);
      }
  
      // Logging FormData for debugging without using .entries()
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
  
      this.apiService.updateProfile(formData).subscribe({
        next: (response: any) => {
          this.toastr.success('Profile updated successfully!');

          // التوجيه إلى صفحة user/profile بعد النجاح
          this.router.navigate(['/user/profile']);
        },
        error: (error: any) => {
          console.error('Error updating profile:', error);
          this.toastr.error('An error occurred while updating the profile.');
        }
      });
    } else {
      console.log('Form is invalid', this.form.errors);
      this.toastr.error('Please check the entered data for validity.');
    }
  }
}  