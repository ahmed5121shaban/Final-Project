import { Routes, RouterModule } from '@angular/router';
import { CreateAuctionComponent } from './Components/create-auction/create-auction.component';
import { EditAuctionComponent } from './Components/edit-auction/edit-auction.component';

const routes: Routes = [
  { path: 'create-auction' , component: CreateAuctionComponent},
  { path: 'edit-auction' , component: EditAuctionComponent},
];

export const ActionRoutes = RouterModule.forChild(routes);


