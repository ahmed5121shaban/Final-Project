import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; // To retrieve item ID from route
import { ItemService } from '../../Services/item.service';  // Import ItemService
import { CategoryService } from '../../../Admin/Services/category.service';
@Component({
  selector: 'app-auction-edit',
  templateUrl: './auction-edit.component.html',
  styleUrl: './auction-edit.component.css'
})
export class EditAuctionComponent implements OnInit {
  auctionForm: FormGroup;
  Images: File[] = [];
  categories: any[] = [];
  Contract!: File;
  imagePreviews: string[] = [];
  itemId!: number; 

  constructor(
    private builder: FormBuilder,
    private itemService: ItemService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,  
    private router: Router
  ) {
    this.auctionForm = this.builder.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Category: ['', Validators.required],
      startPrice: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(50)]],
      sellPrice: ['', [Validators.pattern('^[0-9]*$'), Validators.min(50)]],
      Images: ['', Validators.required],
      Contract: [''],
    });
  }

  // ngOnInit(): void {
    
  //   this.itemId = +this.route.snapshot.paramMap.get('id')!;
  //   console.log(' ID:', this.itemId);
   
  //   this.itemService.getItem(Number(this.itemId)).subscribe((item: any) => {
  //     console.log(item);

  //   this.categoryService.getCategories().subscribe(data => {
  //       this.categories = data.result;

  //     const selectedCategory = this.categories.find(
  //       (cat) => cat.name === item.category
  //     );

  //     this.auctionForm = this.builder.group({
  //       Title: [item.title],
  //       Description:[item.description],
  //       Category: selectedCategory ? selectedCategory.id : null,
  //       startPrice: [item.startPrice],
  //       sellPrice: [item.sellPrice]
  //     });

    
  //     this.Contract = item.contract;
  //     this.imagePreviews = item.images.map((img: any) => img.url); 
  //   });

    
    
  //    // console.log(this.categories[0].name);
    
      
  //   });
  // }
  ngOnInit(): void {
    // Fetch categories first
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.result;
  
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
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      },
    });
  }
  

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input && input.files) {
      this.imagePreviews = [];  

      this.Images = Array.from(input.files);  

      
      Array.from(input.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result as string);  
        };
        reader.readAsDataURL(file);
      });

      
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
      this.Images = Array.from(input.files);
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

  
      formData.append('Title', this.auctionForm.get('Title')?.value);
      formData.append('Description', this.auctionForm.get('Description')?.value);
      formData.append('Category', this.auctionForm.get('Category')?.value);
      formData.append('startPrice', this.auctionForm.get('startPrice')?.value);
      formData.append('sellPrice', this.auctionForm.get('sellPrice')?.value || '');

      // Append contract
    if (this.Contract) {
      formData.append('Contract', this.Contract);
    } else  {
      // If no new contract is chosen, keep the existing contract URL or path.
      formData.append('Contract', this.Contract);
    }
    



     
     // Append images
     if (this.Images && this.Images.length > 0) {
      // If new images are selected, use them
      this.Images.forEach((image, index) => {
        formData.append('Images', image, image.name);
      });
    } else {
      // If no new images are selected, use the existing images
      this.imagePreviews.forEach((imageUrl, index) => {
        formData.append(`existingImages[${index}]`, imageUrl);
      });
    }
     
      this.itemService.editItem(this.itemId, formData).subscribe({
        next: (response) => {
          console.log('Item updated successfully:', response);
       
        },
        error: (error) => {
          console.error('Error updating Item:', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
