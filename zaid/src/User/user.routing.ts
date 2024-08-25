import { Routes, RouterModule } from '@angular/router';
import { ProfileManagementComponent } from './Components/Profile-Management/Profile-Management.component';
import { MyProfileComponent } from './Components/Profile-Management/my-profile/my-profile.component';
import { PaymentComponent } from './Components/Profile-Management/payment/payment.component';
import { ProfileSettingComponent } from './Components/Profile-Management/profile-setting/profile-setting.component';
import { ShippingComponent } from './Components/Profile-Management/shipping/shipping.component';
import { VerifyIdentityComponent } from './Components/Profile-Management/verify-identity/verify-identity.component';
import { ModifyActionComponent } from './Components/Profile-Management/modify-action/modify-action.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { PasswordResetComponent } from './Components/password-reset/password-reset.component';
import { NewPasswordComponent } from './Components/new-password/new-password.component';
import { AddReviewComponent } from './Components/add-review/add-review.component';
import { MyReviewsComponent } from './Components/Profile-Management/my-reviews/my-reviews.component';
import { WatchlistComponent } from './Components/Profile-Management/watchlist/watchlist.component';

const routes: Routes = [
  { path: 'register' , component: RegisterComponent},
  { path: 'login' , component: LoginComponent},
  { path: 'reset-password' , component: PasswordResetComponent},
  { path: 'new-password' , component: NewPasswordComponent},
  { path: 'add-review' , component: AddReviewComponent},
  { path: 'register' , component: RegisterComponent},
  { path: 'login' , component: LoginComponent},
  { path: 'reset-password' , component: PasswordResetComponent},
  { path: 'new-password' , component: NewPasswordComponent},
    { path: '', component: ProfileManagementComponent, children: [
      { path: '', component: MyProfileComponent },
      { path: 'payment', component: PaymentComponent},
      { path: 'profile-setting', component: ProfileSettingComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: 'verify-identity', component: VerifyIdentityComponent },
      { path: 'modify-action', component: ModifyActionComponent },
      { path: 'reviews', component: MyReviewsComponent },
      { path: 'watchlist', component: WatchlistComponent }


    ] },
    { path: 'add-review' , component: AddReviewComponent},
];

export const UserRoutes = RouterModule.forChild(routes);
