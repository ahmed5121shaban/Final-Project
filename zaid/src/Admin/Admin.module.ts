import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './Admin.component';
import { AdminRoutes } from './admin.routing';
import { ProfileReviewComponent } from './Components/profile-review/profile-review.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DashboardHomeComponent } from './Components/dashboard-home/dashboard-home.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { AuctionLiveStreamComponent } from './Components/auction-live-stream/auction-live-stream.component';

import { DashboardLayoutComponent } from './Components/dashboard-layout/dashboard-layout.component';
import { AddEventComponent } from './Components/add-event/add-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersListComponent } from './Components/users-list/users-list.component';
import {EventsListComponent} from './Components/events-list/events-list.component';
import { AuctionsListComponent } from './Components/auctions-list/auctions-list.component';
import { ComplaintsListComponent } from './Components/complaints-list/complaints-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ItemsReviewComponent } from './Components/items-review/items-review.component';
import { AddCategoryComponent } from './Components/add-category/add-category.component';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoadingInterceptor } from '../Shared/Interseptors/loader intersptors/loading.interceptor';
@NgModule({
  imports: [
    CommonModule,
    AdminRoutes,
    
    NgCircleProgressModule.forRoot({
      showUnits: false,
      showSubtitle:true,
    }),
 CanvasJSAngularChartsModule,
    CommonModule,AdminRoutes,FormsModule,ReactiveFormsModule,NgxDatatableModule,
  ],
  declarations: [
     AdminComponent,
     ProfileReviewComponent,
    DashboardHomeComponent,
   DashboardLayoutComponent,AddEventComponent,UsersListComponent,EventsListComponent,AuctionsListComponent,ComplaintsListComponent,
   AuctionLiveStreamComponent,
   ItemsReviewComponent,AddCategoryComponent],

   providers:[
provideHttpClient(
  withInterceptors
  ([])
)
   ]
})
export class AdminModule { }
