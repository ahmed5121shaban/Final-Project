import { Routes, RouterModule } from '@angular/router';
import { CreateAuctionComponent } from './Components/create-auction/create-auction.component';

const routes: Routes = [
  { path: 'create-auction' , component: CreateAuctionComponent},
];

export const ActionRoutes = RouterModule.forChild(routes);
