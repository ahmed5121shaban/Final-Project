import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { SharedComponent } from './Shared.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';


const routes: Routes = [
  // {path:'',component:SharedComponent}, 
   {path:'',component:HomeComponent},
   {path:'contact',component:ContactUsComponent},
  {path:'about',component:AboutUsComponent},
];

export const SharedRoutes = RouterModule.forChild(routes);
