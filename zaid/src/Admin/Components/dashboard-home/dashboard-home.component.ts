import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { DashboardService } from '../../Services/dashboard/dashboard.service';

export interface LastTenAuctions {
  auctionName: string;
  sellerName: string;
  buyerName: string;
  images: any;
  Completed: boolean;
  Ended: boolean;
  StartDate: string;
  EndDate: string;
  ID: number;
}
@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css'],
  //, '../../Admin.component.css'
})
export class DashboardHomeComponent implements OnInit {
  allAuctionsCount!: number;
  topFiveSeller: any;

  viewCat: any = [750, 750];
  category!: { name: string; value: number }[];
  completedAuctions!: number;
  endedAuctions!: number;
  auctionsAmounts!: number;
  lastTenAuctions!: LastTenAuctions[];
  auctionsBidsAmount!: { name: string; value: number }[];
  hubConnection!: signalR.HubConnection;
  legendCategoryPosition: any = 'right';

  constructor(private dashboardService: DashboardService) {
    this.connection();
    //this.tableConnection();
    this.getEndedCompletedAuctionCount();
    this.getAllAuctionsAmounts();
  }
  getEndedCompletedAuctionCount() {
    this.dashboardService.getEndedCompletedAuctionCount().subscribe({
      next: (res: any) => {
        this.completedAuctions = res.completedAuction;
        this.endedAuctions = res.endedAuction;
      },
      error: (err) => console.log(err),
    });
  }

  getAllAuctionsAmounts() {
    this.dashboardService.getAllAuctionsAmounts().subscribe({
      next: (res: any) => {
        this.auctionsAmounts = res.allAmount;
      },
      error: (err) => console.log(err),
    });
  }

  ngOnInit() {
    this.hubConnection.on('auctionsBidsAmount', (res: any) => {
      console.log(res);
      this.auctionsBidsAmount = res;
    });

    this.hubConnection.on('auctionsCount', (res: number) => {
      this.allAuctionsCount = res;
    });

    this.hubConnection.on('topFiveSeller', (res: any) => {
      this.topFiveSeller = res;
    });

    this.hubConnection.on('category', (res: any) => {
      this.category = res;
    });

    this.hubConnection.on('completedAuctions', (res: number) => {
      this.completedAuctions += res;
    });

    this.hubConnection.on('endedAuctions', (res: number) => {
      this.endedAuctions += res;
    });

    this.hubConnection.on('auctionsAmounts', (res: number) => {
      this.auctionsAmounts += res;
    });
  }

  connection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5204/dashboardHub', {
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true,
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    this.hubConnection
      .start()
      .then(() => {
        return this.hubConnection.invoke('dashboard');
      })
      .catch((reason) => console.log(reason));
  }

  tableConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5204/tableDashboardHub', {
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true,
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    this.hubConnection
      .start()
      .then(() => {
        return this.hubConnection.invoke('tableData');
      })
      .then(() => {
        this.hubConnection.on('lastTenAuctions', (res: any) => {
          console.log(res);
          this.lastTenAuctions = res;
        });
      })
      .catch((reason) => console.log(reason));
  }
}
