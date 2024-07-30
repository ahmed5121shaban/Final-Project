import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './Shared.component';
import { HomeComponent } from './Components/home/home.component';
import { SharedRoutes } from './shared.routing';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ToastrModule } from 'ngx-toastr';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { SharedRoutes } from './Shared-routing';
import { NavComponent} from './Components/nav/nav.component';
import { FooterComponent } from './Components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutes,
    CarouselModule,
  ],

  declarations: [
    SharedComponent, 
    AboutUsComponent,
    ContactUsComponent,
    NavComponent,
    FooterComponent,
    HomeComponent
  ],
  exports: [
    NavComponent,
    FooterComponent
  ]
})
export class SharedModule { }
