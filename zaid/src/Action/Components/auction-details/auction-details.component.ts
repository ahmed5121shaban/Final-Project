import { Component } from '@angular/core';
import { log } from 'console';

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrl: './auction-details.component.css'
})
export class AuctionDetailsComponent {
  currentSlide = 0;
  itemImages = [
    { src: 'hd_item_3649360_e2ceb54174.jpg', alt: 'First slide' },
    { src: 'hd_item_3649360_2e647616a8.jpg', alt: 'Second slide' },
    { src: 'hd_item_3649360_2e647616a8.jpg', alt: 'Second slide' },
    { src: 'hd_item_3649360_e2ceb54174.jpg', alt: 'First slide' },
    { src: 'hd_item_3649360_2e647616a8.jpg', alt: 'Second slide' },
    { src: 'hd_item_3649360_2e647616a8.jpg', alt: 'Second slide' },
    { src: 'hd_item_3649360_e2ceb54174.jpg', alt: 'First slide' },
    { src: 'hd_item_3649360_2e647616a8.jpg', alt: 'Second slide' },
    { src: 'hd_item_3649360_2e647616a8.jpg', alt: 'Second slide' },
    { src: 'hd_item_3649360_e2ceb54174.jpg', alt: 'First slide' },
    { src: 'hd_item_3649360_2e647616a8.jpg', alt: 'Second slide' },
    { src: 'hd_item_3649360_2e647616a8.jpg', alt: 'Second slide' },
    { src: 'hd_item_3649360_2e647616a8.jpg', alt: 'Second slide' },
    { src: 'hd_item_3649360_2e647616a8.jpg', alt: 'Second slide' },
    { src: 'hd_item_3649360_2e647616a8.jpg', alt: 'Second slide' },
    // Add more slides as needed
  ];

  similarAuctions = [
    { title: 'Item Title 1', img: 'large_item_3649360_bbb8f93d91.jpg', price: '$10.00' },
    { title: 'Item Title 2', img: 'large_item_3649360_bbb8f93d91.jpg', price: '$20.00' },
    { title: 'Item Title 3', img: 'hd_item_3649360_e2ceb54174.jpg', price: '$30.00' },
    { title: 'Item Title 4', img: 'large_item_3649360_bbb8f93d91.jpg', price: '$40.00' },
    { title: 'Item Title 5', img: 'large_item_3649360_bbb8f93d91.jpg', price: '$50.00' },
    { title: 'Item Title 6', img: 'large_item_3649360_bbb8f93d91.jpg', price: '$60.00' }
  ];

  
  selectSlide(event:Event): void {
    const target = event.target as HTMLElement;
    if (target.tagName.toLowerCase() === 'img') {
      const imgSrc = target.getAttribute('src')// Get the image file name
      const itemIndex = this.itemImages.findIndex(item => item.src  === imgSrc);
      if (itemIndex !== -1) {
        this.currentSlide = itemIndex;
      }
      
    }

    console.log(this.currentSlide)
  }
  ngOnInit(): void {
    this.groupItems();
  }
  groupedItems:Array<any> = [];
  groupItems(): void {
    for (let i = 0; i < this.similarAuctions.length; i += 3) {
      this.groupedItems.push(this.similarAuctions.slice(i, i + 3));
    }
  }  
}
