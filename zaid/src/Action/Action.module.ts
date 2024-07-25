import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionComponent } from './Action.component';
import { AuctionDetailsComponent } from './Components/auction-details/auction-details.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ActionComponent,AuctionDetailsComponent],
  exports:[AuctionDetailsComponent]
})
export class ActionModule { }
