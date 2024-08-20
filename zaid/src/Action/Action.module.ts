import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionComponent } from './Action.component';
import { AuctionDetailsComponent } from './Components/auction-details/auction-details.component';
import { DeleteConfirmationComponent } from './Components/delete-confirmation/delete-confirmation.component';
import { AuctionListComponent } from './Components/auction-list/auction-list.component';
import { AuctionEditComponent } from './Components/auction-edit/auction-edit.component';
import { CreateAuctionComponent } from './Components/create-auction/create-auction.component';
import { ActionRoutes } from './action.routing';
import { AuctionFeedbackComponent } from './Components/auction-feedback/auction-feedback.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  imports: [
    CommonModule,
    ActionRoutes,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
    
    
    
  ],
  declarations: [
    ActionComponent, 
    AuctionListComponent, 
    AuctionEditComponent,
    CreateAuctionComponent,
    AuctionDetailsComponent,
    DeleteConfirmationComponent,
    AuctionFeedbackComponent
  ],
  //exports:[AuctionListComponent,AuctionEditComponent]
})
export class ActionModule { }