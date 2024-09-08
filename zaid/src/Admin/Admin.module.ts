import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './Admin.component';
import { AdminRoutes } from './admin.routing';
import { ProfileReviewComponent } from './Components/profile-review/profile-review.component';
import { NgCircleProgressModule } from 'ng-circle-progress';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutes,
    NgCircleProgressModule.forRoot({
      showUnits: false,
      showSubtitle:true,
    }),
  ],
  declarations: [
     AdminComponent,
     ProfileReviewComponent,
  
    ]
})
export class AdminModule { }
