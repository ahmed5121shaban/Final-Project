import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { SharedComponent } from './Shared.component';

const routes: Routes = [
  /* {path:'',component:SharedComponent}, */
  {path:'',component:HomeComponent},
];

export const SharedRoutes = RouterModule.forChild(routes);
