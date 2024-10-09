import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AdminModule } from '../Admin/Admin.module';
import { UserModule } from '../User/User.module';
import { ActionModule } from '../Action/Action.module';
import { ItemsModule } from '../Items/Items.module';
import { SharedModule } from '../Shared/Shared.module';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from '../Shared/Interseptors/header intersptor/header.interceptor';
import { CookieService } from 'ngx-cookie-service';


@NgModule({

  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    UserModule,
    ActionModule,
    ItemsModule,
    SharedModule,
  ],
  providers: [
    provideHttpClient(withFetch(),withInterceptors([headerInterceptor])),CookieService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
