import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ReviewsService } from '../../Services/reviews/reviews.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  reviewForm: FormGroup;
  auctionId: number = 0;
  sellerInfo: any | null = null;

  constructor(
    private fb: FormBuilder,
    private reviewsService: ReviewsService,
    private route: ActivatedRoute
  ) {
   
    this.route.params.subscribe(params => {
      this.auctionId = +params['id'];
      console.log(this.auctionId); 
    });

    // Initialize the review form
    this.reviewForm = this.fb.group({
      sellerRating: ['', [Validators.required]],
      sellerReview: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  ngOnInit(): void { 
    this.reviewsService.getSellerInfo(this.auctionId).subscribe(
      (data: any) => {
        this.sellerInfo = data;
        console.log(this.sellerInfo);
      },
      error => {
        console.error('Error fetching seller info:', error);
      }
    );
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      const reviewData = this.reviewForm.value;
      reviewData.auctionId = this.auctionId;
      console.log(reviewData);

      this.reviewsService.addReview(reviewData).subscribe(
        response => {
          this.reviewForm.reset(); 
        },
        error => {
          console.error('Error adding review:', error);
        }
      );
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  get sellerRatingControl(): FormControl {
    return this.reviewForm.get('sellerRating') as FormControl; 
  }

  get sellerReviewControl(): FormControl {
    return this.reviewForm.get('sellerReview') as FormControl; 
  }
}
