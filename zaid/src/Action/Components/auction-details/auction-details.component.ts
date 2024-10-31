import { Component, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../Services/payment.service';
import { AuctionService } from '../../Services/auction.service';
import { ToastrService } from 'ngx-toastr';
import * as signalR from '@microsoft/signalr';
import { ApiService } from '../../../User/Services/api.service';

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
  UserCurrency!:string;
  //paymentDetailAuctionID!: any;
  secretKey!: string
  method!:number;
  allBids:any
  lastBid:any;
  hubConnection!:signalR.HubConnection;
  highlightNewBid!:boolean

  constructor(private paymentService:PaymentService ,
    private auctionService: AuctionService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private userserv:ApiService)
  {
    this.openConnectionAndGetAllBidsWithLast();
    this.route.params.subscribe(params => {
      this.auctionId = +params['id']; // Get auction ID from route
      console.log(this.auctionId)
      this.getAuctionDetails(); // Fetch auction details by ID
      this.getUserCurrency();
      this.loadSimilarAuctions();
      //this.getPaymentForBuyer();
    });


  }
  ngOnChanges(): void {}

  notAllowed(){
    this.toastr.warning("you can't place bid in your auction")
  }



  ngOnInit(): void {

    this.hubConnection.on('allBids', (res) => {
      this.allBids = res;
    
      console.log('All bids received:', res);
    });
    

  }

/*   getPaymentForBuyer(){
  this.paymentService.getPaymentForBuyer().subscribe({
    next:(res:any)=>{
      this.paymentDetailAuctionID = res.result;
    },
    error:(err)=>{console.log(err);}
  });
  } */


  userHavePayment(itemID:number,auctionID:number){
    //error in this.auctionDetails.item.id/////

    this.paymentService.userHavePayment(itemID,auctionID).subscribe({
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
          this.userHavePayment(res.item.id,this.auctionId);
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
    if(parseFloat(bidAmount)<1||parseFloat(bidAmount)==undefined||parseFloat(bidAmount)==null||isNaN(parseFloat(bidAmount)))
      {this.toastr.warning("you must bid with more than 1$");return;}

    this.paymentService.placeBid({
      auctionID:this.auctionDetails.id,
      amount:parseFloat(bidAmount),
    }
  ).subscribe(
      {
      next:(res)=>{
        console.log(res);
        this.highlightNewBid = true;
        setTimeout(() => {
          this.highlightNewBid = false;
        }, 3000);},
      error:(err)=>{console.log(err);}
    })
  }


  openConnectionAndGetAllBidsWithLast() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5204/bidsHub', {
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true
      })
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR Connection started');
        return this.hubConnection.invoke('joinGroup', this.auctionId);
      })
      .then(() => {
        console.log('Joined group successfully, fetching bids...');
        return this.hubConnection.invoke('AllBids', this.auctionId);
      })
      .catch((err) => {
        console.log('SignalR Connection Error: ', err);
        this.toastr.error(err);
      });

  }
  getUserCurrency():void{
    this.userserv.getUserCurrency().subscribe({
      next:(data)=>{
        console.log("cuurr",data.result);
        
        this.UserCurrency = data.result;
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }

}
