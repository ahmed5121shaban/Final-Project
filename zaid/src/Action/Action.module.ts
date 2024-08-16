import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionComponent } from './Action.component';
import { ActionRoutes } from './action.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAuctionComponent } from './Components/create-auction/create-auction.component';
import { AuctionEditComponent } from './Components/auction-edit/auction-edit.component';
import { AuctionListComponent } from './Components/auction-list/auction-list.component';
import { AuctionDetailsComponent } from './Components/auction-details/auction-details.component';
import { DeleteConfirmationComponent } from './Components/delete-confirmation/delete-confirmation.component';

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
    AuctionEditComponent,
    AuctionListComponent,
    AuctionDetailsComponent,
    DeleteConfirmationComponent
  ]
})
export class ActionModule { }
export interface Reply {
  id: number;
  text: string;
}

export interface Comment {
  id: number;
  text: string;
  replies: Reply[];
}
