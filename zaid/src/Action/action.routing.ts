import { Routes, RouterModule } from '@angular/router';
import { CreateAuctionComponent } from './Components/create-auction/create-auction.component';
import { AuctionDetailsComponent } from './Components/auction-details/auction-details.component';
import { AuctionListComponent } from './Components/auction-list/auction-list.component';
import { EditAuctionComponent } from './Components/auction-edit/auction-edit.component';
import { DeleteConfirmationComponent } from './Components/delete-confirmation/delete-confirmation.component';
import { WonAuctionComponent } from './Components/won-auction/won-auction.component';

import { AuctionFeedbackComponent } from './Components/auction-feedback/auction-feedback.component';
import { authGuard } from '../Shared/Guards/auth.guard';
import { EventsListComponent } from './Components/events-list/events-list.component';




const routes: Routes = [
  { path: 'create-auction' , component: CreateAuctionComponent,canActivate:[authGuard]},
  { path: 'auction-details/:id' , component: AuctionDetailsComponent},
  { path: 'auction-list/:category', component: AuctionListComponent }, // With category
  { path: 'auction-list', component: AuctionListComponent }, // Without category
  { path: 'auction-edit/:id' , component: EditAuctionComponent,canActivate:[authGuard]},
  { path: 'delete-confirm' , component: DeleteConfirmationComponent,canActivate:[authGuard]},
   { path: 'won-auction/:itemID' , component: WonAuctionComponent,canActivate:[authGuard]},
  { path: 'auction-feedback' , component: AuctionFeedbackComponent},
  { path: 'events-list/:id' , component: EventsListComponent},
];

export const ActionRoutes = RouterModule.forChild(routes);
