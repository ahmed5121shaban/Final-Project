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
import { CompleteAuctionComponent } from './Components/Profile-Management/complete-auction/complete-auction.component';
import { WaitingAuctionComponent } from './Components/Profile-Management/waiting-auction/waiting-auction.component';
import { WonAuctionComponent } from './Components/Profile-Management/won-auction/won-auction.component';
import { LiveAuctionsComponent } from './Components/Profile-Management/live-auctions/live-auctions.component';
import { LostAuctionComponent } from './Components/Profile-Management/lost-auction/lost-auction.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';


const routes: Routes = [
  { path: 'register' , component: RegisterComponent},
  { path: 'login' , component: LoginComponent},
  { path: 'reset-password' , component: PasswordResetComponent},
  { path: 'new-password' , component: NewPasswordComponent},
  { path: 'add-review' , component: AddReviewComponent},
  { path: 'user-profile' , component: UserProfileComponent},

  { path: '', component: ProfileManagementComponent, children: [
      { path: '', component: MyProfileComponent },
      { path: 'payment', component: PaymentComponent},
      { path: 'profile-setting', component: ProfileSettingComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: 'verify-identity', component: VerifyIdentityComponent },
      { path: 'modify-action', component: ModifyActionComponent },
      { path: 'reviews', component: MyReviewsComponent },
      { path: 'complete-auction', component: CompleteAuctionComponent },
      { path: 'waiting-auction', component: WaitingAuctionComponent },
      {path:'won-auction',component:WonAuctionComponent},
      {path:'live-auction',component:LiveAuctionsComponent},
      {path:'lost-auction',component:LostAuctionComponent},

    ] },

  { path: 'add-review' , component: AddReviewComponent},

];

export const UserRoutes = RouterModule.forChild(routes);
