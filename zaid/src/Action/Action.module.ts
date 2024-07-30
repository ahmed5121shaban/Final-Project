import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionComponent } from './Action.component';
import { AuctionListComponent } from './Components/auction-list/auction-list.component';
import { AuctionEditComponent } from './Components/auction-edit/auction-edit.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ActionComponent, AuctionListComponent, AuctionEditComponent],
  exports:[AuctionListComponent,AuctionEditComponent]
})
export class ActionModule { }
