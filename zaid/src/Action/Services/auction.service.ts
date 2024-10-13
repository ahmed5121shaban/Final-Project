import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pagination } from '../Models/models/pagination.model';



@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  private apiUrl = `${environment.apiUrl}api/Auction`


  constructor(private cookieService: CookieService, private http: HttpClient) { }

  createAuction(auction: Auction): Observable<any> {
    return this.http.post(this.apiUrl, auction)
  }

  getAll(): any {
    return this.http.get<any>(`${this.apiUrl}/getall`)
  }

  getAuctionById(auctionId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetById/${auctionId}`);
  }

  getAllActive(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Active`);
  }

  getAllEnded(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Ended`);
  }

  getPaginatedAuctions(
    searchText: string,
    columnName: string,
    isAscending: boolean,
    pageSize: number,
    pageNumber: number,
    categoryName: string | null
  ): Observable<Pagination<Auction[]>> {
    const params = new HttpParams()
      .set('searchtxt', searchText)
      .set('columnName', columnName)
      .set('isAscending', isAscending.toString())
      .set('pageSize', pageSize.toString())
      .set('pageNumber', pageNumber.toString())
      .set('categoryName', categoryName || '');

    return this.http.get<Pagination<Auction[]>>(`${this.apiUrl}/GetActiveAuctions`, { params });
  }


  getPaginatedEndedAuctions(
    searchText: string,
    columnName: string,
    isAscending: boolean,
    pageSize: number,
    pageNumber: number,
    categoryName: string | null
  ): Observable<Pagination<Auction[]>> {
    const params = new HttpParams()
      .set('searchtxt', searchText)
      .set('columnName', columnName)
      .set('isAscending', isAscending.toString())
      .set('pageSize', pageSize.toString())
      .set('pageNumber', pageNumber.toString())
      .set('categoryName', categoryName || '');

    return this.http.get<Pagination<Auction[]>>(`${this.apiUrl}/GetEndedAuctions`, { params });
  }
  // Fetch similar active auctions by category
  getSimilarActiveAuctions(auctionId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/SimilarActiveAuctions/${auctionId}`);
  }
  //get live Auctions for Seller
  getSellerAllLive(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/SellerLive`)
  }
}
export interface Auction {
  ItemId: number;
  Duration: number;
  StartDate: Date;
}
