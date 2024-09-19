import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup;
  categories = ['Art', 'Collectibles', 'Electronics', 'Fashion', 'Furniture'];
  openAuctions: string[] = [];
  allOpenAuctions: { [key: string]: string[] } = {
    'Art': ['Art Auction 1', 'Art Auction 2'],
    'Collectibles': ['Collectible Auction 1', 'Collectible Auction 2'],
    'Electronics': ['Electronics Auction 1', 'Electronics Auction 2'],
    'Fashion': ['Fashion Auction 1', 'Fashion Auction 2'],
    'Furniture': ['Furniture Auction 1', 'Furniture Auction 2']
  };
  imageFile: File | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      category: ['', Validators.required],
      openAuctions: this.fb.array([]), // Initialize as an empty FormArray
    });
  }

  ngOnInit(): void {}

  get openAuctionsControls() {
    return (this.eventForm.get('openAuctions') as FormArray).controls;
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const category = target.value;
    this.openAuctions = this.allOpenAuctions[category] || [];
    const openAuctionsArray = this.eventForm.get('openAuctions') as FormArray;
    openAuctionsArray.clear(); // Clear the existing auctions
    this.addAuction(); // Add one auction field by default
  }

  addAuction(): void {
    const openAuctionsArray = this.eventForm.get('openAuctions') as FormArray;
    openAuctionsArray.push(this.fb.control(''));
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.imageFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const formData = new FormData();
      formData.append('name', this.eventForm.value.name);
      formData.append('description', this.eventForm.value.description);
      formData.append('startDate', this.eventForm.value.startDate);
      formData.append('endDate', this.eventForm.value.endDate);
      formData.append('category', this.eventForm.value.category);
      formData.append('openAuctions', JSON.stringify(this.eventForm.value.openAuctions));
      if (this.imageFile) {
        formData.append('image', this.imageFile);
      }
      
      // Handle event addition logic here, e.g., send data to server
      console.log(this.eventForm.value);
      this.router.navigate(['/events-list']); // Redirect to events list
    }
  }
}
