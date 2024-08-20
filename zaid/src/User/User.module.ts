import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './User.component';
import { RegisterComponent } from './Components/register/register.component';
import { ProfileManagementComponent } from './Components/Profile-Management/Profile-Management.component';
import { MyProfileComponent } from './Components/Profile-Management/my-profile/my-profile.component';
import { PaymentComponent } from './Components/Profile-Management/payment/payment.component';
import { ProfileSettingComponent } from './Components/Profile-Management/profile-setting/profile-setting.component';
import { ShippingComponent } from './Components/Profile-Management/shipping/shipping.component';
import { VerifyIdentityComponent } from './Components/Profile-Management/verify-identity/verify-identity.component';
import { UserRoutes } from './user.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Components/login/login.component';
import { PasswordResetComponent } from './Components/password-reset/password-reset.component';
import { NewPasswordComponent } from './Components/new-password/new-password.component';
import { SellerEarningsComponent } from './Components/seller-earnings/seller-earnings.component';
import { SellerwithdrawComponent } from './Components/sellerwithdraw/sellerwithdraw.component';


@NgModule({
  imports: [
    CommonModule,
    UserRoutes,
    FormsModule,
    ReactiveFormsModule,

  ],
  declarations: [
    UserComponent,
    RegisterComponent,
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
    SellerwithdrawComponent
  ]
})
export class UserModule { }
