import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from '../User/User.module';
import { ItemsModule } from '../Items/Items.module';
import { SharedModule } from '../Shared/Shared.module';
import { AdminModule } from '../Admin/Admin.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActionModule } from '../Action/Action.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ActionModule
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
