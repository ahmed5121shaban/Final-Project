import {
  BrowserModule,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AdminModule } from '../Admin/Admin.module';
import { UserModule } from '../User/User.module';
import { ActionModule } from '../Action/Action.module';
import { SharedModule } from '../Shared/Shared.module';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from '../Shared/Interseptors/header intersptor/header.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { LoaderInterceptor } from '../Shared/Interseptors/loader intersptors/loading.interceptor';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';



@NgModule({

  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    UserModule,
    ActionModule,
    SharedModule,
    AdminModule,
    NgxPaginationModule,
    RouterModule,
    CommonModule

  ],
  providers: [

    provideHttpClient(withFetch(),withInterceptors([headerInterceptor,LoaderInterceptor])),CookieService, provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
