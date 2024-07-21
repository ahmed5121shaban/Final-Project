import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from '../User/User.module';
import { ActionModule } from '../Action/Action.module';
import { ItemsModule } from '../Items/Items.module';
import { SharedModule } from '../Shared/Shared.module';
import { AdminModule } from '../Admin/Admin.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    ActionModule,
    ItemsModule,
    SharedModule,
    AdminModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
