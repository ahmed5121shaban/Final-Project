import { Routes, RouterModule } from '@angular/router';
import { ProfileReviewComponent } from './Components/profile-review/profile-review.component';
import { DashboardHomeComponent } from './Components/dashboard-home/dashboard-home.component';
import { DashboardLayoutComponent } from './Components/dashboard-layout/dashboard-layout.component';


const routes: Routes = [
  { path:"home",component:DashboardHomeComponent },
     { path: 'profile-review' , component:ProfileReviewComponent},

 
];

export const AdminRoutes = RouterModule.forChild(routes);
