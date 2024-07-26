import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionComponent } from './Action.component';
import { AuctionDetailsComponent } from './Components/auction-details/auction-details.component';
import { DeleteConfirmationComponent } from './Components/delete-confirmation/delete-confirmation.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ActionComponent,AuctionDetailsComponent,DeleteConfirmationComponent],
  exports:[AuctionDetailsComponent,DeleteConfirmationComponent]
})
export class ActionModule { }
