import { Routes, RouterModule } from '@angular/router';
import { ProfileManagementComponent } from './Components/Profile-Management/Profile-Management.component';
import { MyProfileComponent } from './Components/Profile-Management/my-profile/my-profile.component';
import { PaymentComponent } from './Components/Profile-Management/payment/payment.component';
import { ProfileSettingComponent } from './Components/Profile-Management/profile-setting/profile-setting.component';
import { ShippingComponent } from './Components/Profile-Management/shipping/shipping.component';
import { VerifyIdentityComponent } from './Components/Profile-Management/verify-identity/verify-identity.component';
import { ModifyActionComponent } from './Components/Profile-Management/modify-action/modify-action.component';

const routes: Routes = [
    { path: '', component: ProfileManagementComponent, children: [
      { path: '', component: MyProfileComponent },
      { path: 'payment', component: PaymentComponent},
      { path: 'profile-setting', component: ProfileSettingComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: 'verify-identity', component: VerifyIdentityComponent },
      { path: 'modify-action', component: ModifyActionComponent },
    ] },
];

export const UserRoutes = RouterModule.forChild(routes);
