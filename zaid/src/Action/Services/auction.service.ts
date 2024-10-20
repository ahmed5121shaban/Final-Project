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


  constructor(private http: HttpClient) { }

  createAuction(auction: Auction): Observable<any> {
    return this.http.post(this.apiUrl, auction)
  }
  getWon():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/won`)

  }
  getBuyerLiveAuctions():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/buyerAuctions`);

  }


  getLost():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/lost`)

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
    searchText: string = '',
    columnName: string = 'Id',
    isAscending: boolean = true,
    pageSize: number = 2,
    pageNumber: number = 1,
    categoryName: string | null = null,
    filterOption:string | null = null
  
  ): Observable<Pagination<Auction[]>> {
    const params = new HttpParams()
      .set('searchtxt', searchText)
      .set('columnName', columnName)
      .set('isAscending', isAscending.toString())
      .set('pageSize', pageSize.toString())
      .set('pageNumber', pageNumber.toString())
      .set('categoryName', categoryName || '')
      .set('filterOption', filterOption || '') 
  
      return this.http.get<Pagination<Auction[]>>(`${this.apiUrl}/GetAuctions`, { params });
  }
  
  // Fetch similar active auctions by category
  getSimilarActiveAuctions(auctionId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/SimilarActiveAuctions/${auctionId}`);
  }
  //get live Auctions for Seller
  getSellerAllLive(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/SellerLive`)
  }


  getPopularAuctions():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/popularAuctions`);
  }
  getNewArrivals():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/newArrivalsAuctions`);
  }
  getEndingSoon():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/endingSoon`);
  }
  getNoBids():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/noBids`);
  }

 getreviews():Observable<any>{
  return this.http.get<any>(`http://localhost:5204/api/review/getall`);
 }

}
export interface Auction {
  ItemId: number;
  Duration: number;
  StartDate: Date;
}
