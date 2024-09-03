import { Routes, RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './Components/dashboard-home/dashboard-home.component';

const routes: Routes = [
  { path:"home",component:DashboardHomeComponent },
];

export const AdminRoutes = RouterModule.forChild(routes);
