import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../Services/category.service';
import { EventService } from '../../Services/event.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuctionService } from '../../../Action/Services/auction.service';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup;
  categories:any;
  inactiveItems: any[] = [];
  activeItems: any[] = [];
  selectedItems: number[]=[];
  uploadedImage!: File;
  activeAuctions: any[] = [];
  fileName: string = ''; // لحفظ اسم الملف المختار
  apiUrl = environment.apiUrl;
  event:boolean= false;

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
    ,private toaster:ToastrService,private router:Router,private auctionService:AuctionService
  ) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      category: ['0', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllActiveAuctions();
    this.checkEvent();
  }

  getAllActiveAuctions() {
    this.auctionService.getAllActive().subscribe({
      next: (response) => {
        console.log(response);
        this.activeAuctions = response;

      },
      error: (error) => {
        console.log(error);

      }
    })
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const categoryId = parseInt(target.value, 10);
  
    // تحقق إذا كانت الفئة المختارة هي الخيار الافتراضي
    if (categoryId === 0) {
      this.inactiveItems = []; // تصفير قائمة العناصر
      this.selectedItems = []; // تصفير العناصر المختارة
    } else {
      const selectedCategory = this.categories.find((cat: any) => cat.id === categoryId);
      if (selectedCategory) {
       
       this.activeAuctions= this.activeAuctions.filter(auction=>auction.item.categoryId==selectedCategory.Id)|| [];
     
        this.activeAuctions.forEach(auction=>this.inactiveItems.push(auction.item));
        
        this.selectedItems = [];
        console.log('Inactive items:', this.inactiveItems);
      } else {
      console.warn('Category not found or items are not available');
      }
    }
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
    if (!this.eventForm.valid || !this.uploadedImage) {
      this.toaster.error("Please fill in all required fields and upload an image.");
      return;
    }
  
    const formData = new FormData();
    formData.append("Title", this.eventForm.controls['name']?.value);
    formData.append("Description", this.eventForm.controls['description']?.value);
    
    // التحقق من الـ category قبل الإرسال
    const categoryValue = this.eventForm.controls['category']?.value;
    if (categoryValue) {
      formData.append("Type", categoryValue);
    } else {
      this.toaster.error("Category is required.");
      return;
    }
  
    formData.append("startDate", this.eventForm.controls['startDate']?.value);
    formData.append("EndDate", this.eventForm.controls['endDate']?.value);
    formData.append("Image", this.uploadedImage, this.uploadedImage.name);
    formData.append("itemsID", this.selectedItems.join("-"));
    
    this.eventService.AddEvent(formData).subscribe({
      next: (res) => {
        this.toaster.success("The Event Added");
        this.router.navigateByUrl('/admin/events-list');
      },
      error: (err) => {
        this.toaster.error("The Event Not Added");
        console.error('Error adding event:', err);
      }
    });
  }
  

  getAllCategory() {
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        if (res && res.result) {
          this.categories = res.result;
          console.log(this.categories);
        } else {
          console.warn('No categories found in response');
        }
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }
  getImageUrl(imagePath: string | null | undefined): string {
    return imagePath ? `${this.apiUrl}${imagePath}` : '';
  }
  checkEvent():void{
  this.eventService.GetAllEvent().subscribe({
    next:res=>{
      if(res != ""){this.event=true;console.log(this.event);}
    },
    error:err=>{
      console.log(err);
      
    }
  })
  }
}  
