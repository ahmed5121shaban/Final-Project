import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../Services/category.service';
import { EventService } from '../../Services/event.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup;
  categories:any;
  inactiveItems: any[] = [];
  selectedItems: number[]=[];
  uploadedImage!: File;
  fileName: string = ''; // لحفظ اسم الملف المختار

  allInactiveItems: { [key: string]: any[] } = {
    'Art': [
      { name: 'Art Item 1', description: 'Description 1', price: 100, imageUrl: 'assets/images/art1.jpg' },
      { name: 'Art Item 2', description: 'Description 2', price: 200, imageUrl: 'assets/images/art2.jpg' }
    ],
    'Collectibles': [
      { name: 'Collectible Item 1', description: 'Description 1', price: 300, imageUrl: 'assets/images/collectible1.jpg' },
      { name: 'Collectible Item 2', description: 'Description 2', price: 400, imageUrl: 'assets/images/collectible2.jpg' }
    ],
    'Electronics': [
      { name: 'Electronics Item 1', description: 'Description 1', price: 500, imageUrl: 'assets/images/electronics1.jpg' },
      { name: 'Electronics Item 2', description: 'Description 2', price: 600, imageUrl: 'assets/images/electronics2.jpg' }
    ],
    'Fashion': [
      { name: 'Fashion Item 1', description: 'Description 1', price: 700, imageUrl: 'assets/images/fashion1.jpg' },
      { name: 'Fashion Item 2', description: 'Description 2', price: 800, imageUrl: 'assets/images/fashion2.jpg' }
    ],
    'Furniture': [
      { name: 'Furniture Item 1', description: 'Description 1', price: 900, imageUrl: 'assets/images/furniture1.jpg' },
      { name: 'Furniture Item 2', description: 'Description 2', price: 1000, imageUrl: 'assets/images/furniture2.jpg' }
    ]
  };

  constructor(private fb: FormBuilder,private categoryService:CategoryService,private eventService:EventService
    ,private toaster:ToastrService
  ) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllCategory();
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const category = target.value;
    this.inactiveItems = this.categories.result[parseInt(category)-1].items || [];
    console.log(this.categories.result[parseInt(category)-1].items);
    this.selectedItems = [];
  }

  onItemSelect(event: Event, itemID: number): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.selectedItems.push(itemID);
    } else {
      this.selectedItems = this.selectedItems.filter(i => i !== itemID);
    }
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.uploadedImage = target.files[0];
      this.fileName = target.files[0].name;  // تحديث اسم الملف المختار
    } else {
      this.fileName = 'No file chosen';
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('auctionImage') as HTMLInputElement;
    fileInput.click();  // محاكاة النقر على المدخل المخفي
  }

  onSubmit(): void {
    const formData = new FormData();

    formData.append("Title",this.eventForm.controls['name']?.value)
    formData.append("Description",this.eventForm.controls['description']?.value)
    formData.append("Type",this.eventForm.controls['category']?.value)
    formData.append("startDate",this.eventForm.controls['startDate']?.value)
    formData.append("EndDate",this.eventForm.controls['endDate']?.value)
    formData.append("Image",this.uploadedImage,this.uploadedImage.name);
    formData.append("itemsID",this.selectedItems.join("-"));
    console.log(formData);

    this.eventService.AddEvent(formData).subscribe({
      next:(res)=>{this.toaster.success("The Event Added");console.log(this.eventForm.controls['name']?.value,
        this.eventForm.controls['description']?.value,
        this.eventForm.controls['category']?.value,
        this.eventForm.controls['startDate']?.value,
        this.eventForm.controls['endDate']?.value,
        this.uploadedImage,
        this.selectedItems
      );
      },
      error:(err)=>{this.toaster.error("The Event Not Added");console.log(this.eventForm.controls['name']?.value,
        this.eventForm.controls['description']?.value,
        this.eventForm.controls['category']?.value,
        this.eventForm.controls['startDate']?.value,
        this.eventForm.controls['endDate']?.value,
        this.uploadedImage,
        this.selectedItems)}
    })
  }

  getAllCategory(){
    this.categoryService.getCategories().subscribe({
      next:(res:any)=>{this.categories=res;console.log(res);
      }
    })
  }
}
