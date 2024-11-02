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
import { CompleteAuctionComponent } from './Components/Profile-Management/complete-auction/complete-auction.component';
import { WaitingAuctionComponent } from './Components/Profile-Management/waiting-auction/waiting-auction.component';
import { WonAuctionComponent } from './Components/Profile-Management/won-auction/won-auction.component';
import { LiveAuctionsComponent } from './Components/Profile-Management/live-auctions/live-auctions.component';
import { LostAuctionComponent } from './Components/Profile-Management/lost-auction/lost-auction.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { SellerEarningsComponent } from './Components/Profile-Management/seller-earnings/seller-earnings.component';
import { SellerwithdrawComponent } from './Components/Profile-Management/sellerwithdraw/sellerwithdraw.component';
import { ComplainAddComponent } from './Components/Profile-Management/complain-add/complain-add.component';
import { MyLiveAuctionsComponent } from './Components/Profile-Management/my-live-auctions/my-live-auctions.component';
import { PendingItemsComponent } from './Components/Profile-Management/pending-items/pending-items.component';
import { AcceptedItemsComponent } from './Components/Profile-Management/accepted-items/accepted-items.component';
import { RejectedItemsComponent } from './Components/Profile-Management/rejected-items/rejected-items.component';
import { AuctionLiveStreamComponent } from './Components/Profile-Management/auction-live-stream/auction-live-stream.component';
import { UpcomingAuctionsComponent } from './Components/Profile-Management/upcoming-auctions/upcoming-auctions.component';
import { authGuard } from '../Shared/Guards/auth.guard';



const routes: Routes = [
/*   { path: 'register' , component: RegisterComponent},
  { path: 'login' , component: LoginComponent}, */
  { path: 'reset-password' , component: PasswordResetComponent,canActivate:[authGuard]},
  { path: 'new-password' , component: NewPasswordComponent,canActivate:[authGuard]},
  { path: 'add-review/:id' , component: AddReviewComponent,canActivate:[authGuard]},
  { path: 'user-profile' , component: UserProfileComponent,canActivate:[authGuard]},
  { path: 'user-profile/:id' , component: UserProfileComponent,canActivate:[authGuard]},

      { path: '', component: ProfileManagementComponent,canActivate:[authGuard], children: [
      { path: 'profile', component: MyProfileComponent},
      { path: 'payment', component: PaymentComponent },
      { path: 'profile-setting', component: ProfileSettingComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: 'verify-identity', component: VerifyIdentityComponent },
      { path: 'modify-action', component: ModifyActionComponent },
      { path: 'reviews', component: MyReviewsComponent },
      { path: 'watchlist', component: WatchlistComponent },
      { path: 'complete-auction', component: CompleteAuctionComponent },
      { path: 'waiting-auction', component: WaitingAuctionComponent },
      {path:'won-auction',component:WonAuctionComponent},
      {path:'live-auction',component:LiveAuctionsComponent},
      {path:'lost-auction',component:LostAuctionComponent},
      { path: 'seller-earnings', component: SellerEarningsComponent },
      { path: 'seller-withdraw', component: SellerwithdrawComponent },
      { path: 'complain-add', component:ComplainAddComponent },
      { path: 'buyer-live-auctions', component:MyLiveAuctionsComponent },
      { path: 'auction-live-stream/:id', component:AuctionLiveStreamComponent },
      { path: 'pending-items', component: PendingItemsComponent },
      { path: 'accepted-items', component: AcceptedItemsComponent },
      { path: 'rejected-items', component: RejectedItemsComponent },
      { path: 'upcoming-auctions', component: UpcomingAuctionsComponent }

    ] },



];

export const UserRoutes = RouterModule.forChild(routes);
