import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './Shared.component';
import { HomeComponent } from './Components/home/home.component';
import { SharedRoutes } from './shared.routing';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  imports: [
    CommonModule,
    SharedRoutes,
    CarouselModule,
    
  ],
  declarations: [
    SharedComponent,
    HomeComponent,

  ]
})
export class SharedModule { }
