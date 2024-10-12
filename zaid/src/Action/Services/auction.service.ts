import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  private apiUrl="http://localhost:5204/api/Auction"

  // private localStorageKey = 'auctionData';
  constructor(private cookieService: CookieService,private http:HttpClient) {
    // const auctionData = this.cookieService.get("key");
    // this.cookieService.set("key","value")
  }

  // saveAuctionData(data: any): void {
  //   const auctionData = JSON.stringify(data);
  //   this.cookieService.set(this.localStorageKey,auctionData)
  //   /* localStorage.setItem(this.localStorageKey, auctionData); */
  // }

  // getAuctionData(): any {
  //   const auctionData = this.cookieService.get(this.localStorageKey);
  //   /* const auctionData = localStorage.getItem(this.localStorageKey); */

  //   return auctionData ? JSON.parse(auctionData) : null;
  // }

  // clearAuctionData(): void {
  //   localStorage.removeItem(this.localStorageKey);
  // }


  createAuction(auction:Auction): Observable<any> {
    return this.http.post(this.apiUrl,auction)
  }

  getAll():any{
    return this.http.get<any>(`${this.apiUrl}/getall`)

  }
  getAllActive(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Active`);
  }
  getAllEnded(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Ended`);
  }
  getSellerAllLive():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/SellerLive`)
  }
}
export interface Auction{
  ItemId:number;
  Duration:number;
  StartDate:Date;
}
