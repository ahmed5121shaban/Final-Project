import { Routes, RouterModule } from '@angular/router';
import { CreateAuctionComponent } from './Components/create-auction/create-auction.component';
import { WonAuctionComponent } from './Components/won-auction/won-auction.component';

const routes: Routes = [
  { path: 'create-auction' , component: CreateAuctionComponent},
  { path: 'won-auction' , component: WonAuctionComponent},
];

export const ActionRoutes = RouterModule.forChild(routes);
