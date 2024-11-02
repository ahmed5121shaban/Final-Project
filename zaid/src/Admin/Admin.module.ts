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
import { EventsListComponent } from './Components/events-list/events-list.component';
import { AuctionsListComponent } from './Components/auctions-list/auctions-list.component';
import { ComplaintsListComponent } from './Components/complaints-list/complaints-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
import { ItemsReviewComponent } from './Components/items-review/items-review.component';
import { AddCategoryComponent } from './Components/add-category/add-category.component';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { CategoryListComponent } from './Components/category-list/category-list.component';
import { ShipmentTrackingComponent } from './Components/shipment-tracking/shipment-tracking.component';
import { ShortTextPipe } from '../Shared/Pipes/short-text.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { EditCategoryComponent } from './Components/edit-category/edit-category.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutes,
    NgCircleProgressModule.forRoot({
      showUnits: false,
      showSubtitle: true,
    }),
    CanvasJSAngularChartsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxPaginationModule,
    NgxChartsModule,
  ],
  declarations: [
    AdminComponent,
    ProfileReviewComponent,
    DashboardHomeComponent,
    DashboardLayoutComponent, AddEventComponent, UsersListComponent, EventsListComponent, AuctionsListComponent, ComplaintsListComponent,
    DashboardLayoutComponent,
    AuctionLiveStreamComponent,
    ItemsReviewComponent, AddCategoryComponent,
    ShortTextPipe,
    CategoryListComponent,
    ShipmentTrackingComponent,
    EditCategoryComponent],



  providers: [

  ]
})
export class AdminModule { }
