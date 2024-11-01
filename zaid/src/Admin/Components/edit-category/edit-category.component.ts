import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../Services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  CategoryForm: FormGroup;
  categoryId!: number;
  category: any;
  imagePreview: string | ArrayBuffer | null = null;
  iconPreview: string | ArrayBuffer | null = null;
  removeImage = false;
  removeIcon = false;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.CategoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['' ],
      icon: ['']

    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = +params['id'];
      this.categoryService.getOneCategory(this.categoryId).subscribe({
        next: (response) => {
          this.category = response;
          this.CategoryForm.patchValue({
            name: this.category.name,
            description: this.category.description
          });
          this.imagePreview = this.category.image; // Assuming `imageUrl` and `iconUrl` properties
          this.iconPreview = this.category.icon;
        },
        error: (error) => console.log(error)
      });
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; 
        this.removeImage=false;

        
        // Set the image preview
      };      reader.readAsDataURL(file);
      this.CategoryForm.patchValue({ image: file });
      this.CategoryForm.get('image')?.updateValueAndValidity();

    }
  }

  onIconSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.iconPreview = reader.result;  // Set the image preview
      };      
      this.removeIcon=false;
      reader.readAsDataURL(file);
      this.CategoryForm.patchValue({ icon: file });
      this.CategoryForm.get('icon')?.updateValueAndValidity();
    }
  }

  removeCurrentImage(): void {
    this.imagePreview = null;
    this.CategoryForm.patchValue({ image: null });
    this.removeImage = true; // Show file input for new image
  }

  removeCurrentIcon(): void {
    this.iconPreview = null;
    this.CategoryForm.patchValue({ icon: null });
    this.removeIcon = true; // Show file input for new icon
  }

  onSubmit() {
    if (this.CategoryForm.valid) {
      const formData = new FormData();
      formData.append('name', this.CategoryForm.get('name')?.value);
      formData.append('description', this.CategoryForm.get('description')?.value);

      // Append the existing image or icon URL if not removed, otherwise append the new file
      if (!this.removeImage && this.imagePreview) {
        formData.append('ImageUrl', this.category.image); // Backend should handle `existingImageUrl`
      } else if (this.CategoryForm.get('image')?.value) {
        formData.append('image', this.CategoryForm.get('image')?.value);
      }

      if (!this.removeIcon && this.iconPreview) {
        formData.append('IconUrl', this.category.icon); // Backend should handle `existingIconUrl`
      } else if (this.CategoryForm.get('icon')?.value) {
        formData.append('icon', this.CategoryForm.get('icon')?.value);
      }

 

      this.categoryService.updateCategory(formData).subscribe({
        next: (response) => {
          this.toastr.success("Category updated successfully");
          this.router.navigate(['admin/categories-list']);
        },
        error: (error) => console.error('Error updating category:', error)
      });
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      
    } else {
      console.log('Form is invalid');
    }

    
  }
}
