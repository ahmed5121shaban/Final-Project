import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuctionService } from '../../Services/auction.service';

@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.css']
})
export class CreateAuctionComponent {
  auctionForm: FormGroup;
  images: File[] = [];

  constructor(
    private builder: FormBuilder,
    private auctionService: AuctionService,
    private router: Router
  ) {
    this.auctionForm = this.builder.group({
      itemTitle: ['', Validators.required],
      itemDescription: ['', Validators.required],
      category: ['', Validators.required],
      startingPrice: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(50)]],
      reservePrice: ['', [Validators.pattern('^[0-9]*$'), Validators.min(50)]],
      duration: ['', Validators.required],
      images: ['', Validators.required],
      itemContract: [''],
      paymentMethod: ['', Validators.required]
    });
  }

  choose(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      console.log('Files chosen:', input.files); // Debugging log
      this.images = Array.from(input.files);
    }
  }

  onSubmit() {
    if (this.auctionForm.valid) {
      const formData = { ...this.auctionForm.value };
      console.log('Form data before processing images:', formData); // Debugging log
      
      if (this.images.length > 0) {
        const imagePaths: string[] = [];
        let imagesProcessed = 0;

        this.images.forEach(image => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            imagePaths.push(e.target.result);
            imagesProcessed++;
            if (imagesProcessed === this.images.length) {
              formData.images = imagePaths;
              this.auctionService.saveAuctionData(formData);
              console.log('Form data saved to local storage:', formData); // Debugging log
              this.router.navigate(['/user/my/profile']);
            }
          };
          reader.readAsDataURL(image);
        });
      } else {
        console.log('No images to upload'); // Debugging log
      }
    } else {
      console.log('Form is invalid'); // Debugging log
    }
  }
}

