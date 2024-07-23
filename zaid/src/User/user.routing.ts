import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';

const routes: Routes = [
  { 
    path:'',component:RegisterComponent
   },
];

export const UserRoutes = RouterModule.forChild(routes);
