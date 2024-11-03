import { Component, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../Services/payment.service';
import { AuctionService } from '../../Services/auction.service';
import { ToastrService } from 'ngx-toastr';
import * as signalR from '@microsoft/signalr';
import { ApiService } from '../../../User/Services/api.service';

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrls: ['./auction-details.component.css'], // Corrected 'styleUrl' to 'styleUrls'
})
export class AuctionDetailsComponent implements OnInit, OnDestroy {
  paymentCount!: number;
  auctionId!: number;
  auctionDetails: any;
  similarAuctions: any[] = [];
  groupedSimilarAuctions: any[][] = [];
  successesPayment!: boolean;
  UserCurrency!: string;
  method!: number;
  allBids: any;
  lastBid: any;
  hubConnection!: signalR.HubConnection;
  highlightNewBid!: boolean;
  isUpcoming: boolean = false;
  auctionEndDate!: Date;
  countdown: string = '';
  private countdownInterval: any;

  constructor(
    private paymentService: PaymentService,
    private auctionService: AuctionService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private userserv: ApiService
  ) {
    this.route.params.subscribe((params) => {
      this.auctionId = +params['id'];
      this.getAuctionDetails();
    });
    this.openConnectionAndGetAllBidsWithLast();
  }

  ngOnInit(): void {
    this.hubConnection.on('allBids', (res) => {
      this.allBids = res;
      console.log('All bids received:', res);
    });
    this.startCountdown();
  }

  ngOnDestroy(): void {
    clearInterval(this.countdownInterval); // Clean up on component destroy
  }

  notAllowed() {
    this.toastr.warning("You can't place a bid in your auction");
  }

  userHavePayment(itemID: number, auctionID: number) {
    this.paymentService.userHavePayment(itemID, auctionID).subscribe({
      next: (res: any) => {
        this.paymentCount = res.count;
        if (res.count == 3) this.method = res.method[0];
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAuctionDetails(): void {
    this.auctionService.getAuctionById(this.auctionId).subscribe({
      next: (res: any) => {
        this.auctionDetails = res;
        this.auctionEndDate = new Date(res.endDate);
        console.log('Auction details:', this.auctionDetails);
        this.checkIfUpcoming();
        this.userHavePayment(res.item.id, this.auctionId);
        this.getUserCurrency();
        this.loadSimilarAuctions();
      },
      error: (error) => {
        console.error('Error fetching auction details:', error);
      },
    });
  }

  loadSimilarAuctions(): void {
    this.auctionService.getSimilarActiveAuctions(this.auctionId).subscribe({
      next: (response) => {
        this.similarAuctions = response;
        this.groupedSimilarAuctions = this.groupItems(this.similarAuctions, 3);
        console.log(this.groupedSimilarAuctions);
      },
      error: (error) => {
        console.error('Error fetching similar auctions', error);
      },
    });
  }

  groupItems(items: any[], groupSize: number): any[][] {
    let groups: any[][] = [];
    for (let i = 0; i < items.length; i += groupSize) {
      groups.push(items.slice(i, i + groupSize));
    }
    return groups;
  }

  firstPayment(paymentMethod: number) {
    this.paymentService
      .firstPaymentAuction({
        auctionID: this.auctionDetails.id,
        amount: this.auctionDetails.item.startPrice,
        method: paymentMethod,
      })
      .subscribe({
        next: (res: any) => {
          window.location.href = res.result;
        },
        error: (err) => {
          console.error('Error', err);
        },
      });
  }

  placeBid(bidAmount: string) {
    if (parseFloat(bidAmount) < 1 || isNaN(parseFloat(bidAmount))) {
      this.toastr.warning('You must bid with more than $1');
      return;
    }

    this.paymentService
      .placeBid({
        auctionID: this.auctionDetails.id,
        amount: parseFloat(bidAmount),
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.highlightNewBid = true;
          setTimeout(() => {
            this.highlightNewBid = false;
          }, 3000);
          this.getAuctionDetails();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  openConnectionAndGetAllBidsWithLast() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5204/bidsHub', {
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true,
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

  getUserCurrency(): void {
    this.userserv.getUserCurrency().subscribe({
      next: (data) => {
        this.UserCurrency = data.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  checkIfUpcoming(): void {
    const startDate = new Date(this.auctionDetails.startDate);
    this.isUpcoming = startDate.getTime() > Date.now();
    console.log('Is Upcoming?', this.isUpcoming);
  }

  startCountdown() {
    this.countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const endTime = this.auctionEndDate.getTime(); // Use the Date object
      const timeLeft = endTime - now;

      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        if (days > 0) {
          this.countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else if (hours > 0) {
          this.countdown = `${hours}h ${minutes}m ${seconds}s`;
        } else if (minutes > 0) {
          this.countdown = `${minutes}m ${seconds}s`;
        } else {
          this.countdown = `${seconds}s`;
        }
      } else {
        this.countdown = 'Auction Ended';
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }
}
