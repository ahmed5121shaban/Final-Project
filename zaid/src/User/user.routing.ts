import { Routes, RouterModule } from '@angular/router';
import { ProfileManagementComponent } from './Components/Profile-Management/Profile-Management.component';
import { MyProfileComponent } from './Components/Profile-Management/my-profile/my-profile.component';
import { PaymentComponent } from './Components/Profile-Management/payment/payment.component';
import { ProfileSettingComponent } from './Components/Profile-Management/profile-setting/profile-setting.component';
import { ShippingComponent } from './Components/Profile-Management/shipping/shipping.component';
import { VerifyIdentityComponent } from './Components/Profile-Management/verify-identity/verify-identity.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { PasswordResetComponent } from './Components/password-reset/password-reset.component';
import { NewPasswordComponent } from './Components/new-password/new-password.component';
import { SellerEarningsComponent } from './Components/seller-earnings/seller-earnings.component';
import { SellerwithdrawComponent } from './Components/sellerwithdraw/sellerwithdraw.component';


const routes: Routes = [
  { path: 'register' , component: RegisterComponent},
  { path: 'login' , component: LoginComponent},
  { path: 'reset-password' , component: PasswordResetComponent},
  { path: 'new-password' , component: NewPasswordComponent},
  { path: 'seller-earnings', component: SellerEarningsComponent },
  { path: 'seller-withdraw', component: SellerwithdrawComponent },
    { path: 'my', component: ProfileManagementComponent, children: [
      { path: 'profile', component: MyProfileComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'profile-setting', component: ProfileSettingComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: 'verify-identity', component: VerifyIdentityComponent },
     
    ] },
];

export const UserRoutes = RouterModule.forChild(routes);
