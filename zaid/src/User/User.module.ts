import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './User.component';
import { ProfileManagementComponent } from './Components/Profile-Management/Profile-Management.component';
import { MyProfileComponent } from './Components/Profile-Management/my-profile/my-profile.component';
import { PaymentComponent } from './Components/Profile-Management/payment/payment.component';
import { ProfileSettingComponent } from './Components/Profile-Management/profile-setting/profile-setting.component';
import { ShippingComponent } from './Components/Profile-Management/shipping/shipping.component';
import { VerifyIdentityComponent } from './Components/Profile-Management/verify-identity/verify-identity.component';
import { UserRoutes } from './user.routing';
import { RegisterComponent } from './Components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Components/login/login.component';

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
    LoginComponent
  ]
})
export class UserModule { }
