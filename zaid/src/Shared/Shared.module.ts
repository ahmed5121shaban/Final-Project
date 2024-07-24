import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './Shared.component';
import { NavComponent} from './Components/nav/nav.component';
import { FooterComponent } from './Components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SharedComponent,NavComponent,FooterComponent
  ]
  ,
  exports: [
    NavComponent,FooterComponent
  ]
})
export class SharedModule { }
