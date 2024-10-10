import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { ItemService } from "../../../Action/Services/item.service";
import { response } from "express";
import { error } from "console";
declare var bootstrap: any; 


@Component({
  selector: 'app-items-review',
  templateUrl: './items-review.component.html',
  styleUrls: ['./items-review.component.css']
})
export class ItemsReviewComponent  implements OnInit {

  selectedImage: string | null = null;

  // List of items with images
  items :any[]= [];
 constructor( private itemService: ItemService){

//  this.get();
 }   
 
  rejectionReason: string = ''; 
  itemIdToReject: number | null = null;

  get():void{
  this.itemService.getPendingItems().subscribe({
        next: (data) => {
          this.items = data;
         console.log('Fetched items:', this.items);
        },
             error: (error) => {
               console.error('Failed to fetch items:', error);
              // You might want to show a user-friendly message here
             }
           });
 }
 ngOnInit(): void {
   this.get();
}
 // Function to Accept Item 
acceptItem(itemId:number):void{
  console.log(itemId);
  this.itemService.AcceptItem(itemId).subscribe({
next:(response)=>{
  console.log("updated successfully",response)
},
error:(error)=>{
  console.log("",error)
}
  });
} 

// Function to open the reject modal and set the itemId
  openRejectModal(itemId: number): void {
    this.itemIdToReject = itemId;
    this.rejectionReason = ''; // Reset the input field
    const modalElement = document.getElementById('rejectModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
 // Function to handle rejection 
  rejectItem(itemId: number | null, reason: string): void {
    if (itemId !== null && reason.trim()) {
     console.log(`Rejecting item ${itemId} with reason: ${reason}`);
      this.itemService.RejecttItem(itemId,reason).subscribe({
      next:(response)=>{
       console.log("updated successfully",response)
    },
   error:(error)=>{
    console.log("",error)
  }
  });
     
      // Close the modal after rejection
      const modalElement = document.getElementById('rejectModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
    } else {
      alert('Please provide a reason for rejection.');
    }
  }
 
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
