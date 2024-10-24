import { Component } from '@angular/core';
import { AuctionService } from '../../../../Action/Services/auction.service';

@Component({
  selector: 'app-seller-earnings',
  templateUrl: './seller-earnings.component.html',
  styleUrl: './seller-earnings.component.css'
})
export class SellerEarningsComponent {
  withdrawnbalance: number = 0;
  availableBalance: number = 0;
  upcomingBalance: number = 0;

  constructor(private auctionService: AuctionService) {
    this.getAvailableBalance();
    this.getUpcomingBalance();
    this.getwithdrawnamount();

  }

  getAvailableBalance() {
    this.auctionService.getAvailableBalance().subscribe({
      next: (response: any) => {
        this.availableBalance = response.result.availablebalance;
        console.log(response);

      },
      error: (error) => {
        console.log(error);

      }
    });

  }
  getUpcomingBalance() {
    this.auctionService.getUpComingBalance().subscribe({
      next: (result: any) => {
        this.upcomingBalance = result.result;
        console.log(result);

      },
      error: (error) => {
        console.log(error);

      }
    });
  }
  getwithdrawnamount() {
    this.auctionService.getwithdrawnamount().subscribe({
      next: (response) => {
        this.withdrawnbalance = response;
      },
      error: (error) => {
        console.log(error);

      }
    })
  }
}
