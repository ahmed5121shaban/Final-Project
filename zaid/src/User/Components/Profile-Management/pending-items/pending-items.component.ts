import { Component } from '@angular/core';
import { ItemService } from '../../../../Action/Services/item.service';
declare var bootstrap: any;

@Component({
  selector: 'app-pending-items',
  templateUrl: './pending-items.component.html',
  styleUrl: './pending-items.component.css'
})
export class PendingItemsComponent {
  pendingItems :any[]=[];
  page: number = 1;
  selectedImage: string | null = null;

  constructor(    
    private itemService: ItemService
 
    ) {

     // get pending items
     this.itemService.getPendingItems().subscribe({
      next: (data) => {
        this.pendingItems = data;
      },
      error: (error) => {
        console.error('Error fetching pending items:', error);
        console.error('Full error response:', JSON.stringify(error));
      }
    });

    } 
  
    showImage(imageUrl: string) {

      this.selectedImage = imageUrl;
    
      // Use Bootstrap's Modal component to show the modal
      const modalElement = document.getElementById('imageModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
}
