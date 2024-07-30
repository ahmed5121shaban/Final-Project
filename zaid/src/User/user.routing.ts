import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
import { RegisterComponent } from './Components/register/register.component';

const routes: Routes = [
  { 
    path:'',component:RegisterComponent
   },
=======
import { ProfileManagementComponent } from './Components/Profile-Management/Profile-Management.component';
import { MyProfileComponent } from './Components/Profile-Management/my-profile/my-profile.component';
import { PaymentComponent } from './Components/Profile-Management/payment/payment.component';
import { ProfileSettingComponent } from './Components/Profile-Management/profile-setting/profile-setting.component';
import { ShippingComponent } from './Components/Profile-Management/shipping/shipping.component';
import { VerifyIdentityComponent } from './Components/Profile-Management/verify-identity/verify-identity.component';

const routes: Routes = [
    { path: 'my', component: ProfileManagementComponent, children: [
      { path: 'profile', component: MyProfileComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'profile-setting', component: ProfileSettingComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: 'verify-identity', component: VerifyIdentityComponent },
    ] },
>>>>>>> bc991c456bc464477fcdb1886ef97f22c985eba7
];

export const UserRoutes = RouterModule.forChild(routes);
