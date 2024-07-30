import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionComponent } from './Action.component';
import { AuctionListComponent } from './Components/auction-list/auction-list.component';
import { AuctionEditComponent } from './Components/auction-edit/auction-edit.component';
import { CreateAuctionComponent } from './Components/create-auction/create-auction.component';
import { ActionRoutes } from './action.routing';

@NgModule({
  imports: [
    CommonModule,
    ActionRoutes,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ActionComponent, 
    AuctionListComponent, 
    AuctionEditComponent,
    CreateAuctionComponent    
  ],
  //exports:[AuctionListComponent,AuctionEditComponent]
})
export class ActionModule { }
