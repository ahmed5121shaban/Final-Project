import { Routes, RouterModule } from '@angular/router';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';

const routes: Routes = [

  {path: '', component:AboutUsComponent},
  {path:'',component:ContactUsComponent  },
];

export const SharedRoutes = RouterModule.forChild(routes);
