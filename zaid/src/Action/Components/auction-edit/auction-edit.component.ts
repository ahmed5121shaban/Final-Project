import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../Services/item.service';
import { CategoryService } from '../../../Admin/Services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auction-edit',
  templateUrl: './auction-edit.component.html',
  styleUrls: ['./auction-edit.component.css']
})
export class EditAuctionComponent implements OnInit {
  auctionForm: FormGroup;
  Images: File[] = [];
  categories: any[] = [];
  Contract!: File;
  imagePreviews: string[] = [];
  itemId!: number;
  item: any;

  constructor(
    private builder: FormBuilder,
    private itemService: ItemService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService
  ) {
    this.route.params.subscribe((param) => {
      this.itemId = param["id"];
    });

    this.auctionForm = this.builder.group({
      Title: ['', Validators.required],
      Description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      Category: ['', Validators.required],
      startPrice: ['', [Validators.pattern('^[0-9]*$'), Validators.min(50)]],
      sellPrice: ['', [Validators.pattern('^[0-9]*$'), Validators.min(50)]],
      Images: [''],
      Contract: [''],
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.result;
<<<<<<< HEAD
        this.GetItemById();
=======
        console.log(this.categories,"fffffffffffffffffffffffffffffffffffffffffffff");

        // Now fetch the item details
        this.itemId = +this.route.snapshot.paramMap.get('id')!;
        console.log('ID:', this.itemId);

        this.itemService.getItem(Number(this.itemId)).subscribe((item: any) => {
          console.log(item);

          // Find the category by name in the retrieved categories
          const selectedCategory = this.categories.find(
            (cat) => cat.name === item.category
          );

          // Set form controls with the selected category ID
          this.auctionForm.patchValue({
            Title: item.title,
            Description: item.description,
            Category: selectedCategory ? selectedCategory.id : null,
            startPrice: item.startPrice,
            sellPrice: item.sellPrice,

            // Contract:item.contract,
            // Images:item.Images

          });
          // Set additional properties
          this.Contract = item.contract;
          this.imagePreviews = item.images.map((img: any) => img.src);

        });
>>>>>>> 4e39a2c207e4b6a23d41afd02ae49a05a2a53f4e
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  GetItemById() {
    this.itemService.getItemById(this.itemId).subscribe({
      next: (item) => {
        this.item = item;
  
        const selectedCategory = this.categories.find((cat) => cat.name === item.category);
  
        this.auctionForm.patchValue({
          Title: item.name,
          Description: item.description,
          Category: selectedCategory ? selectedCategory.id : null,
          startPrice: item.startPrice,
          sellPrice: item.sellPrice,
        });
  
        this.Contract = item.contract;
        this.imagePreviews = item.images.map((img: any) => img.src);
      },
      error: (err) => {
        console.error('Error fetching item:', err);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input && input.files) {
      this.imagePreviews = []; // مسح الصور القديمة
      this.Images = Array.from(input.files); // تعيين الصور الجديدة

      Array.from(input.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      });

      this.auctionForm.patchValue({ Images: this.Images });
    }
  }

  chooseContract(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.Contract = input.files[0];
    }
  }

  onSubmit() {
    if (this.auctionForm.valid) {
      const formData = new FormData();
  
      formData.append('itemId', `${this.itemId}`);
      formData.append('title', this.auctionForm.get('Title')?.value);
      formData.append('description', this.auctionForm.get('Description')?.value);
      formData.append('category', this.auctionForm.get('Category')?.value);
      formData.append('startPrice', this.auctionForm.get('startPrice')?.value);
      formData.append('sellPrice', this.auctionForm.get('sellPrice')?.value || '');
  
      if (this.Contract) {
        formData.append('Contract', this.Contract);
      }
  
      if (this.Images && this.Images.length > 0) {
        this.Images.forEach((image) => {
          formData.append('Images', image, image.name);
        });
      } else {
        this.imagePreviews.forEach((imageUrl, index) => {
          formData.append(`existingImages[${index}]`, imageUrl);
        });
      }
  
      this.itemService.editItem(formData).subscribe({
        next: (response) => {
          this.toaster.success("The Item Updated Successfully");

          // تحديث الصور بعد التعديل
          this.GetItemById();
        },
        error: (error) => {
          this.toaster.error("The Item Not Updated");
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
