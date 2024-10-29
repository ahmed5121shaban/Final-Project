import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  form:FormGroup
  constructor(private formBuilder:FormBuilder,
    private apiService:ApiService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      Street:['',[Validators.required]],
      PostalCode:['',[Validators.required]],
      City:['',[Validators.required]],
      Country:['',[Validators.required]],

    })
   }

   get Street(){return this.form.get('Street')}
   get PostalCode(){return this.form.get('PostalCode')}
   get City(){return this.form.get('City')}
   get Country(){return this.form.get('Country')}


  ngOnInit() {
  }

  editShippingDetail(){
    console.log(this.form.value);
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('Street', this.form.get('Street')?.value || '');
      formData.append('PostalCode', this.form.get('PostalCode')?.value || '');
      formData.append('City', this.form.get('City')?.value || '');
      formData.append('Country', this.form.get('Country')?.value || '');
      this.apiService.updateAddress(formData).subscribe({
        next: (response: any) => {
          this.toastr.success('Address updated successfully!');

          this.router.navigate(['/user/profile']);
        },
        error: (error: any) => {
          console.error('Error updating Address:', error);
          this.toastr.error('An error occurred while updating the Address.');
        }
    });
    }
  }
  // onSubmit() {

  // }
}
