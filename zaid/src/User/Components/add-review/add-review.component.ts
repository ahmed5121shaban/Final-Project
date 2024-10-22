import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ReviewsService } from '../../Services/reviews/reviews.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  reviewForm: FormGroup;

  // Simulated IDs for example purposes (replace with actual values from your user context)
  sellerId: number = 1; // Replace with actual seller ID
  buyerId: number = 123; // Replace with actual buyer ID (usually from logged-in user)

  constructor(private fb: FormBuilder, private reviewsService: ReviewsService) {
    this.reviewForm = this.fb.group({
      sellerRating: ['', [Validators.required]], // Ensure this is required
      sellerReview: ['', [Validators.required, Validators.maxLength(1000)]],
      sellerId: [this.sellerId, [Validators.required]], // Add sellerId field
      buyerId: [this.buyerId, [Validators.required]], // Add buyerId field
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.reviewForm.valid) {
      const reviewData = this.reviewForm.value;
      console.log(reviewData);
      this.reviewsService.addReview(reviewData).subscribe(
        response => {
          alert('Review added successfully!');
          this.reviewForm.reset(); // Reset the form after successful submission
        },
        error => {
          console.error('Error adding review:', error);
          alert('Failed to add review: ' + (error.message || 'An error occurred'));
        }
      );
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  get sellerRatingControl(): FormControl {
    return this.reviewForm.get('sellerRating') as FormControl; // Cast to FormControl
  }

  get sellerReviewControl(): FormControl {
    return this.reviewForm.get('sellerReview') as FormControl; // Cast to FormControl
  }

  get sellerIdControl(): FormControl {
    return this.reviewForm.get('sellerId') as FormControl; // Cast to FormControl
  }

  get buyerIdControl(): FormControl {
    return this.reviewForm.get('buyerId') as FormControl; // Cast to FormControl
  }
}
