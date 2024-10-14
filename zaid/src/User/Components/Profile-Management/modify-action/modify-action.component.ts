import { Component, OnInit } from '@angular/core';
import { ItemService } from "../../../../Action/Services/item.service";
import { AuctionService } from "../../../../Action/Services/auction.service";
import { response } from 'express';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { log } from 'node:console';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-modify-action',
  templateUrl: './modify-action.component.html',
  styleUrls: ['./modify-action.component.css']
})
export class ModifyActionComponent {
  auctionForm: FormGroup ;
  acceptedItems :any[]=[];
  pendingItems :any[]=[];
  rejectedItems :any[]=[];
  auction!:any;
  selectedItemId:any;
  constructor(    
  private itemService: ItemService,
  private auctionService: AuctionService,
  private formbuilder: FormBuilder,
  private toaster:ToastrService
  ) { 

    this.auctionForm=this.formbuilder.group({
      itemId: [''],
      startDate: ['', Validators.required],
      duration: ['', Validators.required]
    })



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
      console.log(this.acceptedItems);
    });
    // get rejected items
    this.itemService.getRejectedItems().subscribe(data => {
      this.rejectedItems = data;     
      console.log(this.rejectedItems);
    });
  }
  onSubmit(itemId:number):void{
    if (this.auctionForm.valid) {
     this.auction = {
        Duration: this.auctionForm.get('duration')?.value,
        StartDate: this.auctionForm.get('startDate')?.value,
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

  ngOnInit(): void {
    
   
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
}

