import { Routes, RouterModule } from '@angular/router';
import { CreateAuctionComponent } from './Components/create-auction/create-auction.component';
import { AuctionDetailsComponent } from './Components/auction-details/auction-details.component';
import { AuctionListComponent } from './Components/auction-list/auction-list.component';
import { AuctionEditComponent } from './Components/auction-edit/auction-edit.component';
import { DeleteConfirmationComponent } from './Components/delete-confirmation/delete-confirmation.component';
import { WatchlistComponent } from './Components/watchlist/watchlist.component';

const routes: Routes = [
  { path: 'create-auction' , component: CreateAuctionComponent},
  { path: 'auction-details' , component: AuctionDetailsComponent},
  { path: 'auction-list' , component: AuctionListComponent},
  { path: 'auction-edit' , component: AuctionEditComponent},
  { path: 'delete-confirm' , component: DeleteConfirmationComponent},
  { path: 'watchlist' , component: WatchlistComponent}

];

export const ActionRoutes = RouterModule.forChild(routes);
