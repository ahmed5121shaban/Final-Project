import { Component } from '@angular/core';
import { ReviewsService } from '../../../Services/reviews/reviews.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.css']
})
export class MyReviewsComponent {
  sellerReviews: any[] = [];
  sellerInfo: any;
  averageRating: number = 0;
  totalReviews: number = 0;
  ratingPercentages: any = {}; // Make this an object, not an array
  ratingPercentagesArray: { star: number; percentage: number }[] = [];
  
  allReviews!:any
  sliceNumber=4

  constructor(
    private reviewsService: ReviewsService,
    private route: ActivatedRoute,
    private toaster:ToastrService
  ){}

  ngOnInit(): void {
    this.getSellerReviews();
  }

  getSellerReviews(): void {
    this.reviewsService.getSellerReviews().subscribe({
      next: (response) => {
        this.sellerReviews = response.reviews;
        this.averageRating = response.averageRating;
        this.totalReviews = response.totalReviews;
        this.ratingPercentages = response.ratingPercentages;
        this.allReviews=response.reviews;
        console.log("reviews", this.allReviews)

        // Convert ratingPercentages to an array after data is received
        this.ratingPercentagesArray = Object.entries(this.ratingPercentages)
          .map(([star, percentage]) => ({
            star: parseInt(star, 10),
            percentage: percentage as number
          }))
          .sort((a, b) => b.star - a.star); // Sort by star descending (5 to 1)

        console.log(this.ratingPercentages);
        console.log(response);
      },
      error: (error) => {
        console.error('Error fetching seller reviews:', error);
      }
    });
  }

  get slicingReviews(){
    return this.allReviews.slice(0,this.sliceNumber);
  }

  moreReviews(){
    if (this.allReviews.length<this.sliceNumber) {
      this.toaster.warning("No more Reviews to show");
      return
    }
    this.sliceNumber+=4;
  }

}
