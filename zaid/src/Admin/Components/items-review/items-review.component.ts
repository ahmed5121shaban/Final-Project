import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { ItemService } from "../../../Action/Services/item.service";
import { response } from "express";
import { error } from "console";
import { ToastrService } from "ngx-toastr";
declare var bootstrap: any;

@Component({
  selector: 'app-items-review',
  templateUrl: './items-review.component.html',
  styleUrls: ['./items-review.component.css']
})
export class ItemsReviewComponent implements OnInit {

  selectedImage: string | null = null;

  // List of items with images
  items: any[] = [];
  page:number=1;
  rejectionReason: string = '';
  itemIdToReject: number | null = null;
  constructor(private itemService: ItemService, private toaster: ToastrService) { }

  get(): void {
    this.itemService.getUnreviewdItems().subscribe({
      next: (data) => {
        this.items = data.reverse();
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



  changetext(event: any) {
    console.log("event", event.target.value)
    console.log("ngmodel", this.rejectionReason)

  }

  // Function to Accept Item 
  acceptItem(itemId: number): void {
    console.log(itemId);
    this.itemService.AcceptItem(itemId).subscribe({
      next: (response) => {
        this.toaster.success("this item successfully accepted");
        this.items = this.items.filter(item => item.id !== itemId);
        console.log("updated successfully", response)
      },
      error: (error) => {
        console.log("", error)
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
  rejectItem(itemId: number | null, rejectReason: string): void {
    console.log(rejectReason, itemId);
    if (itemId != null && rejectReason != null) {

      this.itemService.rejectItem(itemId, rejectReason).subscribe({
        next: (response) => {
          this.toaster.success("this item successfully rejected");
          console.log('Item rejected successfully:', response);
          this.items = this.items.filter(item => item.id !== itemId)
        },
        error: error => {
          console.error('Error:', error);
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
