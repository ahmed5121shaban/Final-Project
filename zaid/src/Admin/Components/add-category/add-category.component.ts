import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../Services/category.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  CategoryForm: FormGroup;

  // category: Category = {
  //   id: 0,
  //   name: "",
  //   image: "",
  //   description: ""
  // };
  imagePreview: string | ArrayBuffer | null = null;
  iconPreview: string | ArrayBuffer | null = null;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr :ToastrService
  ) {

    this.CategoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      icon: ['', Validators.required]

    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];  // Get the first file
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;  // Set the image preview
      };

      reader.readAsDataURL(file);  // Read the file as a data URL
      // assign formcontrol "image" with value in this case the file
      this.CategoryForm.patchValue({ image: file });

      // more check for validaton of the image form control
      const imageControl = this.CategoryForm.get('image');
      if (imageControl) {
        imageControl.updateValueAndValidity();
      }
    }


  }
  onIconSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];  // Get the first file
      const reader = new FileReader();

      reader.onload = () => {
        this.iconPreview = reader.result;  // Set the image preview
      };

      reader.readAsDataURL(file);  // Read the file as a data URL
      // assign formcontrol "image" with value in this case the file
      this.CategoryForm.patchValue({ icon: file });

      // more check for validaton of the image form control
      const iconControl = this.CategoryForm.get('icon');
      if (iconControl) {
        iconControl.updateValueAndValidity();
      }
    }


  }


  onSubmit() {
    if (this.CategoryForm.valid) {
      // Create a FormData object to send form data including the file
      const formData = new FormData();

      // Append text fields (name and description) from the form
      formData.append('name', this.CategoryForm.get('name')?.value);
      formData.append('description', this.CategoryForm.get('description')?.value);

      // Append the file (image) manually
      const imageFile = this.CategoryForm.get('image')?.value;  // This will get the file object
      if (imageFile) {
        formData.append('image', imageFile);
      }
        // Append the file (icon) manually
      const iconFile = this.CategoryForm.get('icon')?.value;  // This will get the file object
      if (iconFile) {
        formData.append('icon', iconFile);
      }

      console.log(formData);
      this.categoryService.addCategory(formData).subscribe({
      next: (response:any) => {
        this.toastr.success("Category added successfully");
      console.log('Category added successfully:', response);
      //this.router.navigate(['admin/categories-list']);
      },
      error: (error:any) => {
       console.error('Error adding category:', error);
      }
      });
    }
    else {
      console.log('Form is invalid');
    }
  }
 
}
