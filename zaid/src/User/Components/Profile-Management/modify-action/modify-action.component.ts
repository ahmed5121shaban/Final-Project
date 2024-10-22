import { Component, OnInit } from '@angular/core';
import { ItemService } from "../../../../Action/Services/item.service";
import { AuctionService } from "../../../../Action/Services/auction.service";
import { response } from 'express';
import { FormArray, FormBuilder, FormGroup,Validators } from '@angular/forms';
import { log } from 'node:console';
import { ToastrService } from 'ngx-toastr';
declare var bootstrap: any;


@Component({
  selector: 'app-modify-action',
  templateUrl: './modify-action.component.html',
  styleUrls: ['./modify-action.component.css']
})
export class ModifyActionComponent {
  pendingPage: number = 1;
  acceptedPage: number = 1;
  rejectedPage: number = 1;  
  selectedImage: string | null = null;
  auctionForms: FormArray;
  acceptedItems :any[]=[];
  pendingItems :any[]=[];
  rejectedItems :any[]=[];
  auction!:any;
  selectedItemId:any;
  today:string;
  constructor(    
  private itemService: ItemService,
  private auctionService: AuctionService,
  private formbuilder: FormBuilder,
  private toaster:ToastrService
  ) { 


    const today = new Date();
    this.today = today.toISOString().split('T')[0];
       this.auctionForms = this.formbuilder.array([]);



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
    
    
    
    // get accepted items
    this.itemService.getAcceptedItems().subscribe(data => {
      this.acceptedItems = data;
      this.initForms();     
      console.log(this.acceptedItems);
    });
    // get rejected items
    this.itemService.getRejectedItems().subscribe(data => {
      this.rejectedItems = data;     
      console.log(this.rejectedItems);
    });
  }

//separate form created for each accepted item

initForms() {
    this.acceptedItems.forEach(item => {
      this.auctionForms.push(this.formbuilder.group({
        duration: ['', Validators.required],
        startDate: ['', Validators.required]
      }));
    });
  }
  getAuctionForm(index: number): FormGroup {
    return this.auctionForms.at(index) as FormGroup;
  }

  onSubmit(itemId:number,index:number):void{

const auctionForm=this.getAuctionForm(index);

    if (auctionForm.valid) {
     this.auction = {
        Duration: auctionForm.get('duration')?.value,
        StartDate: auctionForm.get('startDate')?.value,
        ItemId: itemId  // Send itemId as a number
      };
      console.log(this.auction);

    this.auctionService.createAuction(this.auction).subscribe({

      next:(response)=>{
        this.toaster.success("Auction Added Successfully");
        this.acceptedItems = this.acceptedItems.filter(item => item.id !== itemId);
      },
      error: (error) => {
        this.toaster.error("Failed to add auction");

        console.error('Error creating auction:', error);
      }
    });

  }
  }


setSelectedItemId(id:number){
  this.selectedItemId=id;
}

deleteItem(){
  if(this.selectedItemId != null)
this.itemService.deleteItem(this.selectedItemId).subscribe({
next:(response)=>{
  console.log("deleted successfully");
  this.toaster.success("Item deleted successfully")
  this.acceptedItems = this.acceptedItems.filter(item => item.id !== this.selectedItemId);
  this.rejectedItems = this.rejectedItems.filter(item => item.id !== this.selectedItemId);
},
error:(error)=>{
  console.log(`failed to delete,${error}`)
}

})
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

