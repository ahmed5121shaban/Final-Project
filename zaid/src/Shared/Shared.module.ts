import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './Shared.component';
import { SharedRoutes } from './shared.routing';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { NavComponent} from './Components/nav/nav.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { HomeComponent } from './Components/home/home.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutes,
    CarouselModule,
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
    NotificationsComponent,
    NotFoundComponent,
    AboutUsComponent,
    HomeComponent,
    ContactUsComponent

  ],
  exports: [
    NavComponent,
    FooterComponent
  ]
})
export class SharedModule { }
