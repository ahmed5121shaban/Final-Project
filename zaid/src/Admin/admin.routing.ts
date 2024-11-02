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
import { CategoryListComponent } from './Components/category-list/category-list.component';
import { authGuard } from '../Shared/Guards/auth.guard';
import { EditCategoryComponent } from './Components/edit-category/edit-category.component';


const routes: Routes = [

  { path: "home", component: DashboardHomeComponent,canActivate:[authGuard] },
  { path: 'users-list', component: UsersListComponent,canActivate:[authGuard] },
  { path: 'profile-review', component: ProfileReviewComponent,canActivate:[authGuard] },
  { path: 'profile-review/:id', component: ProfileReviewComponent,canActivate:[authGuard] },
  { path: 'add-event', component: AddEventComponent,canActivate:[authGuard] },
  { path: 'events-list', component: EventsListComponent,canActivate:[authGuard] },
  { path: 'auctions-list', component: AuctionsListComponent,canActivate:[authGuard] },
  { path: 'auction-live-stream/:id', component: AuctionLiveStreamComponent,canActivate:[authGuard] },
  { path: 'Shipment-Tracking/:id', component: ShipmentTrackingComponent,canActivate:[authGuard] },
  { path: 'complaints-list', component: ComplaintsListComponent,canActivate:[authGuard] },
  { path: 'items-review', component: ItemsReviewComponent,canActivate:[authGuard] },
  { path: 'add-category', component: AddCategoryComponent,canActivate:[authGuard] },
  { path: 'categories-list',component: CategoryListComponent,canActivate:[authGuard]},
  { path: 'edit-category/:id', component: EditCategoryComponent,canActivate:[authGuard] },


];

export const AdminRoutes = RouterModule.forChild(routes);
