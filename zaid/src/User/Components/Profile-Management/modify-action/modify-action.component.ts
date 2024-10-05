import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../../Action/Services/item.service';
import { response } from 'express';

@Component({
  selector: 'app-modify-action',
  templateUrl: './modify-action.component.html',
  styleUrls: ['./modify-action.component.css']
})
export class ModifyActionComponent implements OnInit {

  constructor(private itemService:ItemService) { }

  ngOnInit() {
  }
delete(itemId:number){
  this.itemService.deleteItem(itemId).subscribe((response:any)=>{
    if(response.result==200)
      
      console.log("Item deleted successfully")
    else
    console.log("Failed to delete Item")

  })
}
}
