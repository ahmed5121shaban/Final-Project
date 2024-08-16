import { Routes, RouterModule } from '@angular/router';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';

const routes: Routes = [
  // {path:'',component:AboutUsComponent  },

  {path:'',component:ContactUsComponent  },
  {path:'notifications',component:NotificationsComponent  }
];

export const SharedRoutes = RouterModule.forChild(routes);
