import { Component, OnInit } from '@angular/core';
import { CircleProgressComponent } from 'ng-circle-progress';

@Component({
  selector: 'app-profile-review',
  templateUrl: './profile-review.component.html',
  styleUrl: './profile-review.component.css'
})
export class ProfileReviewComponent implements OnInit{
  // Define properties for the circle progress component
  radius = 100;
  outerStrokeWidth = 10;
  innerStrokeWidth = 10;
  outerStrokeColor = "#6c59f7";
  innerStrokeColor =" #e6e6e6";
  animation = true;
  animationDuration = 300;
  titleColor = '#000000';
  subtitleColor = '#000000';

  

  sellercards = [
    { percent: 23, title: 'Completed Auction' },
    { percent: 45, title: 'Unfinished Auction' },
    { percent: 78, title: 'Seller Rating' },
    { percent: 55, title: 'Profile Completion' }
  ];

  buyercards = [
    { percent: 23, title: 'Won Auction' },
    { percent: 45, title: 'Lost Auction' },
    { percent: 78, title: 'Profile Completion' },
    { percent: 55, title: 'Profile Completion' }
  ];

  getSubtitle(percent: number): string {
    return `${percent}%`;
  }

  ngOnInit() {
    // You can initialize or update values here if needed
  }
  sort(column: string) {
   
     
  }


}

 