import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup;
  categories = ['Art', 'Collectibles', 'Electronics', 'Fashion', 'Furniture'];
  inactiveItems: any[] = [];
  selectedItems: any[] = [];
  uploadedImage: File | null = null;
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

  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const category = target.value;
    this.inactiveItems = this.allInactiveItems[category] || [];
    this.selectedItems = [];
  }

  onItemSelect(event: Event, item: any): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems = this.selectedItems.filter(i => i !== item);
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
    if (this.eventForm.valid) {
      console.log('Form Data:', this.eventForm.value);
      console.log('Selected Items:', this.selectedItems);
      console.log('Uploaded Image:', this.uploadedImage);
    } else {
      console.log('Form is invalid');
    }
  }
}