import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './Admin.component';
import { AdminRoutes } from './admin.routing';
import { ProfileReviewComponent } from './Components/profile-review/profile-review.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DashboardHomeComponent } from './Components/dashboard-home/dashboard-home.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

import { DashboardLayoutComponent } from './Components/dashboard-layout/dashboard-layout.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutes,
    NgCircleProgressModule.forRoot({
      showUnits: false,
      showSubtitle:true,
    }),
 CanvasJSAngularChartsModule,
    CommonModule,AdminRoutes,
  ],
  declarations: [
     AdminComponent,
     ProfileReviewComponent,
    DashboardHomeComponent,
   DashboardLayoutComponent]
})
export class AdminModule { }
