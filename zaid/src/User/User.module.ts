import { NgModule} from '@angular/core';
import { UserComponent } from './User.component';
import { ProfileManagementComponent } from './Components/Profile-Management/Profile-Management.component';
import { MyProfileComponent } from './Components/Profile-Management/my-profile/my-profile.component';
import { PaymentComponent } from './Components/Profile-Management/payment/payment.component';
import { ProfileSettingComponent } from './Components/Profile-Management/profile-setting/profile-setting.component';
import { ShippingComponent } from './Components/Profile-Management/shipping/shipping.component';
import { VerifyIdentityComponent } from './Components/Profile-Management/verify-identity/verify-identity.component';
import { UserRoutes } from './user.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddReviewComponent } from './Components/add-review/add-review.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { PasswordResetComponent } from './Components/password-reset/password-reset.component';
import { NewPasswordComponent } from './Components/new-password/new-password.component';
import { MyReviewsComponent } from './Components/Profile-Management/my-reviews/my-reviews.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ModifyActionComponent } from './Components/Profile-Management/modify-action/modify-action.component';
import { SellerEarningsComponent } from './Components/Profile-Management/seller-earnings/seller-earnings.component';
import { SellerwithdrawComponent } from './Components/Profile-Management/sellerwithdraw/sellerwithdraw.component';
import { LostAuctionComponent } from './Components/Profile-Management/lost-auction/lost-auction.component';
import { LiveAuctionsComponent } from './Components/Profile-Management/live-auctions/live-auctions.component';
import { ComplainAddComponent } from './Components/Profile-Management/complain-add/complain-add.component';
import { MyLiveAuctionsComponent } from './Components/Profile-Management/my-live-auctions/my-live-auctions.component';
import { AdminModule } from '../Admin/Admin.module';
import { CommonModule } from '@angular/common';
import { WonAuctionComponent } from './Components/Profile-Management/won-auction/won-auction.component';
import { WaitingAuctionComponent } from './Components/Profile-Management/waiting-auction/waiting-auction.component';
import { WatchlistComponent } from "./Components/Profile-Management/watchlist/watchlist.component";
import { NgxPaginationModule } from "ngx-pagination";
import { CompleteAuctionComponent } from './Components/Profile-Management/complete-auction/complete-auction.component';
import { PendingItemsComponent } from './Components/Profile-Management/pending-items/pending-items.component';
import { AcceptedItemsComponent } from './Components/Profile-Management/accepted-items/accepted-items.component';
import { RejectedItemsComponent } from './Components/Profile-Management/rejected-items/rejected-items.component';
import { AuctionLiveStreamComponent } from './Components/Profile-Management/auction-live-stream/auction-live-stream.component';
import { UpcomingAuctionsComponent } from './Components/Profile-Management/upcoming-auctions/upcoming-auctions.component';


@NgModule({
  imports: [
    CommonModule,
    UserRoutes,
    FormsModule,
    CarouselModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    NewPasswordComponent,
    PasswordResetComponent,
    UserComponent,
    ProfileManagementComponent,
    MyProfileComponent,
    PaymentComponent,
    ProfileSettingComponent,
    ShippingComponent,
    VerifyIdentityComponent,
    LoginComponent,
    PasswordResetComponent,
    NewPasswordComponent,
    SellerEarningsComponent,
    SellerwithdrawComponent,
    ModifyActionComponent,
    AddReviewComponent,
    MyReviewsComponent,
    UserProfileComponent,
    LiveAuctionsComponent,
    WonAuctionComponent,
    LostAuctionComponent,
    ComplainAddComponent,
    MyLiveAuctionsComponent,
    WaitingAuctionComponent,
    WatchlistComponent,
    CompleteAuctionComponent,
    PendingItemsComponent,
    AcceptedItemsComponent,
    RejectedItemsComponent,
    AuctionLiveStreamComponent,
    UpcomingAuctionsComponent

  ],


})
export class UserModule { }
