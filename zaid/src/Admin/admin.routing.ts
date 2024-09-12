import { Routes, RouterModule } from '@angular/router';
import { ProfileReviewComponent } from './Components/profile-review/profile-review.component';
import { DashboardHomeComponent } from './Components/dashboard-home/dashboard-home.component';
import { AuctionLiveStreamComponent } from './Components/auction-live-stream/auction-live-stream.component';


const routes: Routes = [
  { path:"home",component:DashboardHomeComponent },
     { path: 'profile-review' , component:ProfileReviewComponent},
     
     { path: 'auction-live-stream', component: AuctionLiveStreamComponent }


];

export const AdminRoutes = RouterModule.forChild(routes);
