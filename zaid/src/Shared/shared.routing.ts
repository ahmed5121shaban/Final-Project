import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { SharedComponent } from './Shared.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';

import { FaqRulesComponent } from './Components/faq-rules/faq-rules.component';
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './chat/message/message.component';
import { EmptyMessageComponent } from './chat/empty-message/empty-message.component';
import { authGuard } from './Guards/auth.guard';


const routes: Routes = [
  // {path:'',component:SharedComponent},
   {path:'',component:HomeComponent},
   {path:'contact',component:ContactUsComponent},
  {path:'about',component:AboutUsComponent},
  {path:'notifications',component:NotificationsComponent,canActivate:[authGuard]},
   {path:'chat',component:ChatComponent,canActivate:[authGuard],children:[
    {path:'message/:id',component:MessageComponent,canActivate:[authGuard]},
    {path:'',component:EmptyMessageComponent,canActivate:[authGuard]}
   ]},
  { path: 'contact', component: ContactUsComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'faq', component: FaqRulesComponent },

];

export const SharedRoutes = RouterModule.forChild(routes);
