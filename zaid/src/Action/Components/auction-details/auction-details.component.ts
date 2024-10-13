import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../Services/payment.service';
import { AuctionService } from '../../Services/auction.service';
import { ToastrService } from 'ngx-toastr';
import { log } from 'node:console';

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
  paymentMethod!:number;
  currentSlide = 0;
  auctionId!: number;
  auctionDetails: any;
  successesPayment!:boolean;
  paymentDetail!:any;
  secretKey!:string;
  highestBid!:any;
  allBidsINAuction: any;

  constructor(private paymentService:PaymentService ,
    private auctionService: AuctionService,
    private toastr: ToastrService,
    private route: ActivatedRoute)
  {
     this.paymentService.userHavePayment().subscribe({
       next:(res:any)=>{
         console.log(res)
          this.paymentCount=res.count;
        }
    })

  }
  ngOnChanges(): void {
    this.paymentService.getHighestBid(this.auctionId).subscribe({
      next:(res:any)=>{this.highestBid=res;
      },
      error:(err)=>console.log(err)
    });
    this.paymentService.getAllBidsInAuction(this.auctionId).subscribe({
      next:(res:any)=>{
         this.allBidsINAuction=res
        },
      error:(err)=>console.log(err)

    })
  }

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

    })
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
          window.location.href = res.urlCheckOut;
        else
          this.secretKey = res;
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


}
