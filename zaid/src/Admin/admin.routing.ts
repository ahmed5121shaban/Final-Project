import { Routes, RouterModule } from '@angular/router';
import { ProfileReviewComponent } from './Components/profile-review/profile-review.component';


const routes: Routes = [
  { path: 'profile-review' , component:ProfileReviewComponent},
];

export const AdminRoutes = RouterModule.forChild(routes);
