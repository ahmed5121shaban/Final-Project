import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './Admin.component';
import { AdminRoutes } from './admin.routing';
import { DashboardHomeComponent } from './Components/dashboard-home/dashboard-home.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutes,
    CanvasJSAngularChartsModule
  ],
  declarations: [
    AdminComponent,
    DashboardHomeComponent,
  ]
})
export class AdminModule { }
