import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ReviewsService } from '../../Services/reviews/reviews.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent {
  reviewForm: FormGroup;
  auctionId: number = 0;
  sellerInfo: any | null = null;

  constructor(
    private fb: FormBuilder,
    private reviewsService: ReviewsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.route.params.subscribe(params => {
      this.auctionId = +params['id'];
      console.log(this.auctionId);
    });

    // Initialize the review form
    this.reviewForm = this.fb.group({
      sellerRating: ['', [Validators.required]],
      sellerReview: ['', [Validators.required, Validators.maxLength(1000)]],
      auctionId: [this.auctionId] 
    });

    this.fetchSellerInfo();
  }

  fetchSellerInfo() {
    this.reviewsService.getSellerInfo(this.auctionId).subscribe(
      (data: any) => {
        this.sellerInfo = data;
        if (!this.sellerInfo) {
          this.toastr.error("No seller information found.");
        }
      },
      error => {
        console.error('Error fetching seller info:', error);
        this.toastr.error("Error fetching seller info.");
      }
    );
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      const reviewData = { ...this.reviewForm.value, auctionId: this.auctionId };
      console.log('Review Data:', reviewData);
      this.reviewsService.addReview(reviewData).subscribe({
        next: (response) => {
          this.toastr.success("Review Added Successfully");
          this.reviewForm.reset(); // Reset the form after submission
          this.router.navigate(['user/won-auction']);
          console.log('Review added successfully:', response);
        },
        error: (error) => {
          this.toastr.error("Can't Add Item");
          console.error('Error adding Item:', error.error);
        }
      });
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
