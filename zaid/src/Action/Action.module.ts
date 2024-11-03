import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionComponent } from './Action.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuctionDetailsComponent } from './Components/auction-details/auction-details.component';
import { DeleteConfirmationComponent } from './Components/delete-confirmation/delete-confirmation.component';
import { AuctionListComponent } from './Components/auction-list/auction-list.component';
import { EditAuctionComponent } from './Components/auction-edit/auction-edit.component';
import { CreateAuctionComponent } from './Components/create-auction/create-auction.component';
import { ActionRoutes } from './action.routing';
import { AuctionFeedbackComponent } from './Components/auction-feedback/auction-feedback.component';
import { WonAuctionComponent } from './Components/won-auction/won-auction.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserModule } from '../User/User.module';
import { EventsListComponent } from './Components/events-list/events-list.component';

@NgModule({
  imports: [
    CommonModule,
    ActionRoutes,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    UserModule
  ],
  declarations: [
    ActionComponent,
    CreateAuctionComponent,
    EditAuctionComponent,
    AuctionListComponent,
    AuctionDetailsComponent,
    DeleteConfirmationComponent,
    AuctionFeedbackComponent,
    WonAuctionComponent,
    EventsListComponent

  //exports:[AuctionListComponent,AuctionEditComponent]
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
