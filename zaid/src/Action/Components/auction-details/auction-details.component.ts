import { Component } from '@angular/core';
import { log } from 'console';

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrl: './auction-details.component.css'
})
export class AuctionDetailsComponent {
  currentSlide = 0;
  slides = [
    { src: 'hd_item_3649360_e2ceb54174.jpg', alt: 'First slide' },
    { src: 'hd_item_3649360_2e647616a8.jpg', alt: 'Second slide' },
    { src: 'https://via.placeholder.com/800x400', alt: 'Third slide' },
    { src: 'https://via.placeholder.com/800x400', alt: 'First slide' },
    { src: 'hd_item_3649360_2e647616a8.jpg', alt: 'Second slide' },
    { src: 'https://via.placeholder.com/800x400', alt: 'Third slide' }
    // Add more slides as needed
  ];

  
  selectSlide(index: number): void {
      console.log("hello");
      console.log('Thumbnail clicked:', index);
    this.currentSlide = index;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide > 0) ? this.currentSlide - 1 : this.slides.length - 1;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide < this.slides.length - 1) ? this.currentSlide + 1 : 0;
  }
}
