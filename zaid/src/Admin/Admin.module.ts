import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './Admin.component';
import { DashboardLayoutComponent } from './Components/dashboard-layout/dashboard-layout.component';
import { AdminRoutes } from './admin.routing';


@NgModule({
  imports: [
    CommonModule,AdminRoutes,
  ],
  declarations: [AdminComponent, DashboardLayoutComponent]
})
export class AdminModule { }
