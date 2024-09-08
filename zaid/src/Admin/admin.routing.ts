import { Routes, RouterModule } from '@angular/router';
import { AuctionLiveStreamComponent } from './Components/auction-live-stream/auction-live-stream.component';

const routes: Routes = [
  { path: 'auction-live-stream', component: AuctionLiveStreamComponent }
];

export const AdminRoutes = RouterModule.forChild(routes);
