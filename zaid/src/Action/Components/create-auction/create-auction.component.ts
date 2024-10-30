import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../../Admin/Services/category.service';
import { ItemService } from '../../Services/item.service';
import { ToastrService } from 'ngx-toastr';
// import { ItemService } from '../../Services/item.service';
@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.css']
})
export class CreateAuctionComponent {
  auctionForm: FormGroup;
  Images: File[] = [];
  categories: any[] = [];
  Contract!: File;
  imagePreviews: string[] = [];

  constructor(
    private builder: FormBuilder,
    private itemService :ItemService,
    private categoryService: CategoryService,
    private router: Router,
    private toastr:ToastrService
  ) {
    this.auctionForm = this.builder.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Category: ['', Validators.required],
      startPrice: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(50)]],
      sellPrice: ['', [Validators.pattern('^[0-9]*$'), Validators.min(50)]],
      Images: ['', Validators.required],
      Contract: ['']
    });


    this.categoryService.getCategories().subscribe({
      next:(data) =>{
        this.categories = data.result;
      },
      error:(err) =>{
        console.log(err);
        
      },
    });
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input && input.files) {
      this.imagePreviews = [];  // Clear previous previews
      this.Images = Array.from(input.files);  // Store selected files

      // Loop through selected files and generate previews
      Array.from(input.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result as string);  // Store the preview URL
        };
        reader.readAsDataURL(file);
      });

      // Update form control for validation
      this.auctionForm.patchValue({ Images: this.Images });
      const imageControl = this.auctionForm.get('Images');
      if (imageControl) {
        imageControl.updateValueAndValidity();
      }
    }
  }



  chooseImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      console.log('Files chosen:', input.files); // Debugging log
      this.Images = Array.from(input.files);
    }
  }
  chooseContract(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      console.log('Contract Files chosen:', input.files); // Debugging log
      this.Contract = input.files[0];
    }
  }

  onSubmit() {
    if (this.auctionForm.valid) {
      const formData = new FormData();

      // Append form values
      formData.append('Title', this.auctionForm.get('Title')?.value);
      formData.append('Description', this.auctionForm.get('Description')?.value);
      formData.append('Category', this.auctionForm.get('Category')?.value);
      formData.append('startPrice', this.auctionForm.get('startPrice')?.value);
      formData.append('sellPrice', this.auctionForm.get('sellPrice')?.value || '');
      formData.append('Contract', this.Contract);

      // Append images (files)
      this.Images.forEach((image, index) => {
        formData.append('Images', image, image.name);
      });


      console.log('FormData before submission:', formData);

      this.itemService.addItem(formData).subscribe({
        next: (response) => {
          this.toastr.success("Item Added Successfully");
          this.router.navigate(['user/pending-items'])
          console.log('Item added successfully:', response);

          // Reset the form or navigate after submission
        },
        error: (error) => {
          this.toastr.error("Can't Add Item");
          console.error('Error adding Item:', error.error);
        }

      });
    }
    else {
      console.log('Form is invalid');
    }
  }


}

