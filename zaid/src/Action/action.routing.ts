import { Routes, RouterModule } from '@angular/router';
import { CreateAuctionComponent } from './Components/create-auction/create-auction.component';
import { AuctionDetailsComponent } from './Components/auction-details/auction-details.component';
import { AuctionListComponent } from './Components/auction-list/auction-list.component';
import { EditAuctionComponent } from './Components/auction-edit/auction-edit.component';
import { DeleteConfirmationComponent } from './Components/delete-confirmation/delete-confirmation.component';
import { WonAuctionComponent } from './Components/won-auction/won-auction.component';

import { AuctionFeedbackComponent } from './Components/auction-feedback/auction-feedback.component';




const routes: Routes = [
  { path: 'create-auction' , component: CreateAuctionComponent},
  { path: 'auction-details/:id' , component: AuctionDetailsComponent},
  { path: 'auction-list/:category', component: AuctionListComponent }, // With category
  { path: 'auction-list', component: AuctionListComponent }, // Without category
  { path: 'auction-edit/:id' , component: EditAuctionComponent},
  { path: 'delete-confirm' , component: DeleteConfirmationComponent},
   { path: 'won-auction/:itemID' , component: WonAuctionComponent},
  { path: 'auction-feedback' , component: AuctionFeedbackComponent},
];

export const ActionRoutes = RouterModule.forChild(routes);
