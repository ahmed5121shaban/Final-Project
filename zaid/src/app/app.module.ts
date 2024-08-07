import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserModule } from '../User/User.module';
import { ActionModule } from '../Action/Action.module';
import { ItemsModule } from '../Items/Items.module';
import { SharedModule } from '../Shared/Shared.module';
import { AdminModule } from '../Admin/Admin.module';



@NgModule({
  declarations: [
    AppComponent,
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    UserModule,
    ActionModule,
    ItemsModule,
    SharedModule,
    AdminModule,
    
  
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }