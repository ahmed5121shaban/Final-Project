import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { SharedComponent } from './Shared.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';

import { FaqRulesComponent } from './Components/faq-rules/faq-rules.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  // {path:'',component:SharedComponent}, 
   {path:'',component:HomeComponent},
   {path:'contact',component:ContactUsComponent},
  {path:'about',component:AboutUsComponent},
  {path:'notifications',component:NotificationsComponent},

  // {path:'',component:SharedComponent},
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'faq', component: FaqRulesComponent },
  { path: 'chat', component: ChatComponent },
];

export const SharedRoutes = RouterModule.forChild(routes);
