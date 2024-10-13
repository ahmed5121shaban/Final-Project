import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../Services/payment.service';
import { Location } from '@angular/common';
import { AuctionService } from '../../Services/auction.service';

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
  paymentCount !: {count : number, payment : string};
  currentSlide = 0;
  auctionId!: number;
  auctionDetails: any;
  similarAuctions: any[] = [];
  groupedSimilarAuctions: any[][] = []; // Grouped auctions for the carousel

  constructor(private paymentService:PaymentService ,
    private auctionService: AuctionService,
    private route: ActivatedRoute,
    private location:Location
  ) {}


  ngOnChanges(): void {
    this.paymentService.userHavePayment().subscribe(
      (res:any)=>{
        console.log(res.message)
        this.paymentCount.count=res.count;
        this.paymentCount.payment=res.payment;

      }
    )
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.auctionId = +params['id']; // Get auction ID from route
      this.getAuctionDetails(); // Fetch auction details by ID
      this.loadSimilarAuctions();
    });
  }

    // Fetch auction details from service by ID
    getAuctionDetails(): void {
      this.auctionService.getAuctionById(this.auctionId).subscribe(
        (res: any) => {
          this.auctionDetails = res;
          console.log('Auction details:', this.auctionDetails);
        },
        (error) => {
          console.error('Error fetching auction details:', error);
        }
      );
    }

 // Fetch similar auctions from the service
  loadSimilarAuctions(): void {
    this.auctionService.getSimilarActiveAuctions(this.auctionId).subscribe({
      next: (response) => {
        this.similarAuctions = response;
        this.groupedSimilarAuctions = this.groupItems(this.similarAuctions, 3); // Group auctions into sets of 3 for carousel
        console.log(this.groupedSimilarAuctions)
      },
      error: (error) => {
        console.error('Error fetching similar auctions', error);
      },
      complete: () => {
        console.log('Completed fetching similar auctions');
      }
    });
  }

  // Utility function to group items into sets of a specific size
  groupItems(items: any[], groupSize: number): any[][] {
    let groups: any[][] = [];
    for (let i = 0; i < items.length; i += groupSize) {
      groups.push(items.slice(i, i + groupSize));
    }
    return groups;
  }


  // comments
  comments: Comment[] = [
    { id: 1, text: 'This is a comment from a sara.',author:"sara", replies: [{id:2,text:"This is a reply from a buyer."}] },
    { id: 1, text: 'This is a comment from a nermeen.',author:"nermeen",  replies: [{id:2,text:"This is a reply from a buyer."}] },
    { id: 1, text: 'This is a comment from a nada.', author:"nada", replies: [{id:2,text:"This is a reply from a buyer."}] }
    // Add more comments if needed
  ];

  payment(){
    this.paymentService.firstPaymentAuction().subscribe({
      next:(res:any)=>{
        console.log(res.status);
        console.log(res.urlCheckOut);
        window.location.href = res.urlCheckOut;
      },
      error:(err)=>{
        console.error("error", err);
      }
    })
  }

}
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router'; // To get the auction ID from the route
// import { AuctionService } from '../../Services/auction.service'; // Service to fetch auction details
// import { PaymentService } from '../../Services/payment.service'; 

// @Component({
//   selector: 'app-auction-details',
//   templateUrl: './auction-details.component.html',
//   styleUrl: './auction-details.component.css'
// })
// export class AuctionDetailsComponent implements OnInit {
//   paymentCount!: { count: number, payment: string };
//   currentSlide = 0;
//   auctionId!: number;
//   auctionDetails: any; // To hold the fetched auction details

//   constructor(
//     private paymentService: PaymentService,
//     private auctionService: AuctionService,
//     private route: ActivatedRoute // To access route parameters
//   ) {}

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.auctionId = +params['id']; // Get auction ID from route
//       this.getAuctionDetails(); // Fetch auction details by ID
//     });
//     this.groupItems();
//     this.loadPaymentData();
//   }

//   // Fetch auction details from service by ID
//   getAuctionDetails(): void {
//     this.auctionService.getAuctionById(this.auctionId).subscribe(
//       (res: any) => {
//         this.auctionDetails = res;
//         console.log('Auction details:', this.auctionDetails);
//       },
//       (error) => {
//         console.error('Error fetching auction details:', error);
//       }
//     );
//   }

//   // Fetch user payment details
//   loadPaymentData(): void {
//     this.paymentService.userHavePayment().subscribe(
//       (res: any) => {
//         this.paymentCount = { count: res.count, payment: res.payment };
//       },
//       (error) => {
//         console.error('Error fetching payment data:', error);
//       }
//     );
//   }

//   // Items and slides logic (same as before)
//   itemImages = [
//     { src: 'hd_item_3649360_e2ceb54174.jpg' },
//     { src: 'hd_item_3649360_e2ceb54174.jpg' },
//     { src: 'hd_item_3649360_e2ceb54174.jpg' },
//     { src: 'hd_item_3649360_e2ceb54174.jpg' }
//   ];

//   similarAuctions = [
//     { title: 'Item Title 1', img: 'large_item_3649360_bbb8f93d91.jpg', price: '$10.00' },
//     { title: 'Item Title 2', img: 'large_item_3649360_bbb8f93d91.jpg', price: '$20.00' },
//     { title: 'Item Title 3', img: 'hd_item_3649360_e2ceb54174.jpg', price: '$30.00' },
//     { title: 'Item Title 4', img: 'large_item_3649360_bbb8f93d91.jpg', price: '$40.00' },
//     { title: 'Item Title 5', img: 'large_item_3649360_bbb8f93d91.jpg', price: '$50.00' },
//     { title: 'Item Title 6', img: 'large_item_3649360_bbb8f93d91.jpg', price: '$60.00' }
//   ];

//   groupedItems: Array<any> = [];

//   groupItems(): void {
//     for (let i = 0; i < this.similarAuctions.length; i += 3) {
//       this.groupedItems.push(this.similarAuctions.slice(i, i + 3));
//     }
//   }

//   // Add more functionality as needed
// }
