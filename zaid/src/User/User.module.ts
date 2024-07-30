import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './User.component';
<<<<<<< HEAD
import { RegisterComponent } from './Components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [UserComponent, RegisterComponent]
=======
import { ProfileManagementComponent } from './Components/Profile-Management/Profile-Management.component';
import { MyProfileComponent } from './Components/Profile-Management/my-profile/my-profile.component';
import { PaymentComponent } from './Components/Profile-Management/payment/payment.component';
import { ProfileSettingComponent } from './Components/Profile-Management/profile-setting/profile-setting.component';
import { ShippingComponent } from './Components/Profile-Management/shipping/shipping.component';
import { VerifyIdentityComponent } from './Components/Profile-Management/verify-identity/verify-identity.component';
import { UserRoutes } from './user.routing';

@NgModule({
  imports: [
    CommonModule,
    UserRoutes,
  ],
  declarations: [
    UserComponent,
    ProfileManagementComponent,
    MyProfileComponent,
    PaymentComponent,
    ProfileSettingComponent,
    ShippingComponent,
    VerifyIdentityComponent
  ]
>>>>>>> bc991c456bc464477fcdb1886ef97f22c985eba7
})
export class UserModule { }
