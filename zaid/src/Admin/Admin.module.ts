import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './Admin.component';
import { AuctionLiveStreamComponent } from './Components/auction-live-stream/auction-live-stream.component';
import { AdminRoutes } from './admin.routing';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutes
  ],
  declarations: [AdminComponent,AuctionLiveStreamComponent]
})
export class AdminModule { }
