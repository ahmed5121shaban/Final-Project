import { Component } from '@angular/core';
import { ItemService } from '../../../../Action/Services/item.service';
import { ToastrService } from 'ngx-toastr';
declare var bootstrap: any;

@Component({
  selector: 'app-rejected-items',
  templateUrl: './rejected-items.component.html',
  styleUrl: './rejected-items.component.css'
})
export class RejectedItemsComponent {
 
  rejectedItems :any[]=[];
  page: number = 1;  
  selectedItemId:any;
  selectedImage: string | null = null;


  constructor(    
    private itemService: ItemService,
    private toaster:ToastrService

 
    ) {

   // get rejected items
   this.itemService.getRejectedItems().subscribe(data => {
    this.rejectedItems = data;     
    console.log(this.rejectedItems);
  });
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

toggleShowMore(item: any, event: Event) {
  event.preventDefault();
  item.showMore = !item.showMore;
}
}
