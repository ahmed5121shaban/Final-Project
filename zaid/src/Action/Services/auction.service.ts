import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  private localStorageKey = 'auctionData';

  constructor() { }

  saveAuctionData(data: any): void {
    const auctionData = JSON.stringify(data);
    localStorage.setItem(this.localStorageKey, auctionData);
  }

  getAuctionData(): any {
    const auctionData = localStorage.getItem(this.localStorageKey);
    return auctionData ? JSON.parse(auctionData) : null;
  }

  clearAuctionData(): void {
    localStorage.removeItem(this.localStorageKey);
  }
}

