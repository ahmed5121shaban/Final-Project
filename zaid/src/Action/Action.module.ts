import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionComponent } from './Action.component';
import { CreateAuctionComponent } from './Components/create-auction/create-auction.component';
import { EditAuctionComponent } from './Components/edit-auction/edit-auction.component';
import { ActionRoutes } from './action.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ActionRoutes,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ActionComponent,
    CreateAuctionComponent,
    EditAuctionComponent
  ]
})
export class ActionModule { }
