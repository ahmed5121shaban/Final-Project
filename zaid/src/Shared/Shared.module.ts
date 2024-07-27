import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './Shared.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ToastrModule } from 'ngx-toastr';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { SharedRoutes } from './Shared-routing';
@NgModule({
  imports: [

    CommonModule,SharedRoutes,
  
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
  declarations: [SharedComponent, AboutUsComponent,ContactUsComponent]
})
export class SharedModule { }
