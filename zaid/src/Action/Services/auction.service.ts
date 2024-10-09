import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  private localStorageKey = 'auctionData';

  constructor(private cookieService: CookieService) {}

  saveAuctionData(data: any): void {
    const auctionData = JSON.stringify(data);
    this.cookieService.set(this.localStorageKey,auctionData)
    /* localStorage.setItem(this.localStorageKey, auctionData); */
  }

  getAuctionData(): any {
    const auctionData = this.cookieService.get(this.localStorageKey);
    /* const auctionData = localStorage.getItem(this.localStorageKey); */

    return auctionData ? JSON.parse(auctionData) : null;
  }

  clearAuctionData(): void {
    localStorage.removeItem(this.localStorageKey);
  }
}

