import { Routes, RouterModule } from '@angular/router';
import { ProfileReviewComponent } from './Components/profile-review/profile-review.component';
import { DashboardHomeComponent } from './Components/dashboard-home/dashboard-home.component';
import { AuctionLiveStreamComponent } from './Components/auction-live-stream/auction-live-stream.component';

import { AddEventComponent } from './Components/add-event/add-event.component';
import { UsersListComponent } from './Components/users-list/users-list.component';
import { EventsListComponent } from './Components/events-list/events-list.component';
import { AuctionsListComponent } from './Components/auctions-list/auctions-list.component';
import { ComplaintsListComponent } from './Components/complaints-list/complaints-list.component';
import { ItemsReviewComponent } from './Components/items-review/items-review.component';
import { AddCategoryComponent } from './Components/add-category/add-category.component';
import { ShipmentTrackingComponent } from './Components/shipment-tracking/shipment-tracking.component';


const routes: Routes = [
  { path: "home", component: DashboardHomeComponent },
  { path: 'users-list', component: UsersListComponent },
  { path: 'profile-review', component: ProfileReviewComponent },
  { path: 'add-event', component: AddEventComponent },
  { path: 'events-list', component: EventsListComponent },
  { path: 'auctions-list', component: AuctionsListComponent },
  { path: 'auction-live-stream/:id', component: AuctionLiveStreamComponent },
  { path: 'Shipment-Tracking', component: ShipmentTrackingComponent },
  { path: 'complaints-list', component: ComplaintsListComponent },
  { path: 'items-review', component: ItemsReviewComponent },
  { path: 'add-category', component: AddCategoryComponent },

];

export const AdminRoutes = RouterModule.forChild(routes);
