import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './Shared.component';
import { SharedRoutes } from './shared.routing';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { NavComponent} from './Components/nav/nav.component';
import { FooterComponent } from './Components/footer/footer.component';
import { FaqRulesComponent } from './Components/faq-rules/faq-rules.component';
import { LoaderComponent } from './Components/loader/loader.component';
import { LoaderService } from './Interseptors/loader intersptors/loader.service';
import { LoadingInterceptor } from './Interseptors/loader intersptors/loading.interceptor';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient } from '@angular/common/http';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';
import { HomeComponent } from './Components/home/home.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { ChatComponent } from './chat/chat.component';


@NgModule({
  imports: [
    CommonModule,
    SharedRoutes,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 5000, // الوقت الذي تظهر فيه الرسالة (بالميللي ثانية)
      positionClass: 'toast-top-right', // مكان ظهور الرسالة
      preventDuplicates: true, // منع تكرار الرسائل
      closeButton: true, // عرض زر الإغلاق
      progressBar: true, // عرض شريط التقدم
      progressAnimation: 'increasing', // نوع الرسوم المتحركة لشريط التقدم
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
      }
    }),

    ReactiveFormsModule, FormsModule
  ],

  declarations: [
    SharedComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    FaqRulesComponent,
    LoaderComponent,
    NotificationsComponent,
    NotFoundComponent,
    ContactUsComponent,
    ChatComponent


  ],
  providers: [

    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  exports: [
    NavComponent,
    FooterComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
