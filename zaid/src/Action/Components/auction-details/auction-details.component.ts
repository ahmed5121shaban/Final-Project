import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../Services/payment.service';
import { AuctionService } from '../../Services/auction.service';
import { ToastrService } from 'ngx-toastr';
declare var Stripe: any;

interface Reply {
  id: number;
  text: string;
}

interface Comment {
  id: number;
  author:string;
  text: string;
  replies: Reply[];
}

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrl: './auction-details.component.css'
})
export class AuctionDetailsComponent implements OnChanges {
  paymentCount!: number;
  auctionId!: number;
  auctionDetails: any;
  successesPayment!: boolean;
  paymentDetail!: any;
  secretKey!: string
  highestBid!: any;
  allBidsINAuction: any;
  stripe: any;
  card: any;
  clientSecret!: string;
  showPaymentForm!:boolean;

  constructor(private paymentService:PaymentService ,
    private auctionService: AuctionService,
    private toastr: ToastrService,
    private route: ActivatedRoute)
  {
     this.paymentService.userHavePayment().subscribe({
       next:(res:any)=>{
         console.log(res,"paymentCount")
          this.paymentCount=res.count;
        }
    });

    this.stripe = Stripe('pk_test_51Q7StDIrAruRO4wHiVE3HWQFcSb3kga4AcTBtj5YiUCY65vQK46kvWlSXJzBfxcXtocZPB3gMfE9VYDFt2y9ES6n00sovijgpI');

  }
  ngOnChanges(): void {}

  notAllowed(){
    this.toastr.warning("you can't place bid in your auction")
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.auctionId = +params['id']; // Get auction ID from route
      this.getAuctionDetails(); // Fetch auction details by ID
    });
    // this.groupItems();
    this.paymentService.getPaymentForBuyer().subscribe({
      next:(res)=>{
        this.successesPayment = true;
        this.paymentDetail = res;
        console.log(res)
      },
      error:(err)=>{
        this.successesPayment = false;
        console.log(err);
      }
    });
    this.paymentService.getHighestBid(this.auctionId).subscribe({
      next:(res:any)=>{this.highestBid=res
        ;console.log(res,'highestBid');
      },
      error:(err)=>console.log(err)
    });
    this.paymentService.getAllBidsInAuction(this.auctionId).subscribe({
      next:(res:any)=>{
        console.log(res);
         this.allBidsINAuction=res
        },
      error:(err)=>console.log(err)

    });

  }

    // Fetch auction details from service by ID
    getAuctionDetails(): void {
      this.auctionService.getAuctionById(this.auctionId).subscribe({
        next:(res: any) => {
          this.auctionDetails = res;
          console.log('Auction details:', this.auctionDetails);
        },
        error:(error) => {
          console.error('Error fetching auction details:', error);
        }
      });
    }

  // comments
  comments: Comment[] = [
    { id: 1, text: 'This is a comment from a sara.',author:"sara", replies: [{id:2,text:"This is a reply from a buyer."}] },
    { id: 1, text: 'This is a comment from a nermeen.',author:"nermeen",  replies: [{id:2,text:"This is a reply from a buyer."}] },
    { id: 1, text: 'This is a comment from a nada.', author:"nada", replies: [{id:2,text:"This is a reply from a buyer."}] }
    // Add more comments if needed
  ];

  firstPayment(paymentMethod:number){
    this.paymentService.firstPaymentAuction({
      auctionID:this.auctionDetails.id,
      amount:this.auctionDetails.item.startPrice,
      method:paymentMethod,
    }).subscribe({
      next:(res:any)=>{
        if(paymentMethod==0)
          window.location.href = res.result;
        else
          window.location.href  = res.result;
      },
      error:(err)=>{
        console.error("error", err);
      }
    })
  }

  placeBid(bidAmount:string){
    this.paymentService.placeBid({
      auctionID:this.auctionDetails.id,
      amount:parseFloat(bidAmount),
    }
  ).subscribe(
      {
      next:(res)=>{console.log(res);},
      error:(err)=>{console.log(err);}
    })
  }


  confirmPaymentWithStripe() {
    this.stripe.confirmCardPayment("sk_test_51Q7StDIrAruRO4wHt88JtzHnOuRRg94eiizvvTXQ9fuZ8LbWTvI3VnTAfvb5KSRiCTB30skTXT2IvujWSo3p5q2G001DMa9Koj", {
      payment_method: {
        card: this.card,
      }
    }).then((result: any) => {
      if (result.error) {
        // Show error to the user
        this.toastr.error(result.error.message, "Payment Error");
        console.error(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          // Payment was successful
          this.toastr.success("Payment successful!", "Success");
          console.log("Payment successful!");
        }
      }
    }).catch((error: any) => {
      console.error("Stripe confirmation error:", error);
      this.toastr.error("Payment failed, please try again.", "Error");
    });
  }
  ngAfterViewInit(): void {
    if (!this.card && this.showPaymentForm) {
      const elements = this.stripe.elements();
      this.card = elements.create('card'); // Create a card element
      this.card.mount('#card-element'); // Mount it to the div with id 'card-element'
    }
  }
}
