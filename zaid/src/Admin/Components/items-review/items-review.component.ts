import { Component } from "@angular/core";
declare var bootstrap: any; 



interface Item{
  id: number;
      title: string;
      description:string;
      images:  { path: string }[]; 
      startPrice:number;
      reservePrice:number;
      payment:"PayPal"|"Stripe";
      file: string[];
}
@Component({
  selector: 'app-items-review',
  templateUrl: './items-review.component.html',
  styleUrls: ['./items-review.component.css']
})

export class ItemsReviewComponent {

  selectedImage: string | null = null;

  // List of items with images
  items :Item[]= [
    {
      id: 1,
      title: 'Coin',
      description: 'Old Coin',
      images: [
        { path: '300-1.jpg' },
        { path: '300-2.jpg' }
    
      ],
      startPrice:1000,
      reservePrice:10,
      payment:"PayPal",
      file:["https://trello.com/b/QPDw2t12/zied"]
    }
  ];

  // Method to open the modal and set the selected image
  showImage(imageUrl: string) {
    
    this.selectedImage = imageUrl;

    // Use Bootstrap's Modal component to show the modal
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  // Close the modal
  closeModal() {
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }
}
