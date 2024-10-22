import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../Services/payment.service';
import { AuctionService } from '../../Services/auction.service';
import { ToastrService } from 'ngx-toastr';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../../environments/environment';

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
  similarAuctions: any[] = [];
  groupedSimilarAuctions: any[][] = []; // Grouped auctions for the carouses
  successesPayment!: boolean;
  paymentDetailAuctionID!: any;
  secretKey!: string
  method!:number;
  allBids:any
  lastBid:any

  constructor(private paymentService:PaymentService ,
    private auctionService: AuctionService,
    private toastr: ToastrService,
    private route: ActivatedRoute)
  {
    this.route.params.subscribe(params => {
      this.auctionId = +params['id']; // Get auction ID from route
      console.log(this.auctionId)
      this.getAuctionDetails(); // Fetch auction details by ID
      this.loadSimilarAuctions();
      this.getPaymentForBuyer();
    });

  }
  ngOnChanges(): void {}

  notAllowed(){
    this.toastr.warning("you can't place bid in your auction")
  }



  ngOnInit(): void {

      let hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${environment.apiUrl}bidsHub`)
        .build();

      hubConnection
        .start()
        .then(() => {
          return hubConnection.invoke('joinGroup', this.auctionId);
        })
        .catch((err) => console.error('SignalR Connection Error: ', err));

        hubConnection.on("allBids",(res:any)=>{
          console.log(res," signalr connection  signalr connection  signalr connection  signalr connection ");
          this.allBids = res;
        })
        hubConnection.on("lastBid",(res:any)=>{
          console.log(res," signalr connection  signalr connection  signalr connection  signalr connection ");
          this.lastBid = res;
        })

  }

  getPaymentForBuyer(){
  this.paymentService.getPaymentForBuyer().subscribe({
    next:(res:any)=>{
      console.log(res,"getPaymentFor Buyer getPaymentFor Buyer getPaymentFor Buyer getPaymentFor Buyer getPaymentForBuyer");
      this.successesPayment = true;
      this.paymentDetailAuctionID = res.result;
      console.log(this.paymentDetailAuctionID,"getPaymentFor Buyer getPaymentFor Buyer getPaymentFor Buyer getPaymentFor Buyer getPaymentForBuyer");
    },
    error:(err)=>{
      this.successesPayment = false;
    }
  });
  }
  userHavePayment(itemID:number){
    //error in this.auctionDetails.item.id/////

    this.paymentService.userHavePayment(itemID).subscribe({
      next:(res:any)=>{
         this.paymentCount=res.count;
         if(res.count==3)
           this.method=res.method[0]
         console.log(res)
       },error:(err)=>{console.log(err)}
   });
  }

    // Fetch auction details from service by ID
    getAuctionDetails(): void {

      this.auctionService.getAuctionById(this.auctionId).subscribe({
        next:(res: any) => {
          this.auctionDetails = res;
          console.log('Auction details:', this.auctionDetails);
          this.userHavePayment(res.item.id);
        },
        error:(error) => {
          console.error('Error fetching auction details:', error);
        }
      });




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



}
