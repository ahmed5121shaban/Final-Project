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

 this.get();
 }   
  // ngOnChanges(changes: SimpleChanges): void {
  //    this.get();
  //  }

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
  // this.get();
}
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
