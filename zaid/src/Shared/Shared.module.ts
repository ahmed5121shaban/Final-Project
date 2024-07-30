import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './Shared.component';
<<<<<<< HEAD
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ToastrModule } from 'ngx-toastr';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { SharedRoutes } from './Shared-routing';
import { NavComponent} from './Components/nav/nav.component';
import { FooterComponent } from './Components/footer/footer.component';
=======
>>>>>>> parent of da99e36 (Merge branch 'ahmed-gamal')

@NgModule({
  imports: [
    CommonModule
  ],
<<<<<<< HEAD
  declarations: [SharedComponent, AboutUsComponent,ContactUsComponent,NavComponent,FooterComponent]
  
  
  ,
  exports: [
    NavComponent,FooterComponent
  ]
=======
  declarations: [SharedComponent]
>>>>>>> parent of da99e36 (Merge branch 'ahmed-gamal')
})
export class SharedModule { }
