import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { finalize, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pagination } from '../Models/models/pagination.model';
import { DoneAuction } from '../../User/Components/Profile-Management/waiting-auction/waiting-auction.component';
import { LoaderService } from '../../Shared/Interseptors/loader intersptors/loader.service';



@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  private apiUrl = `${environment.apiUrl}api/Auction`


  constructor(private http: HttpClient,private loader : LoaderService) { }

  createAuction(auction: Auction): Observable<any> {
    return this.http.post(this.apiUrl, auction)
  }
  getWon():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/won`)
  }

  AllDoneAuctions(){
    return this.http.get(`${this.apiUrl}/AllDoneAuctions`)
  }

  AllCompletedAuctions(){
    return this.http.get(`${this.apiUrl}/AllCompletedAuctions`)
  }
  AllInCompletedAuctions(){
    return this.http.get(`${this.apiUrl}/AllInCompletedAuctions`)
  }
  getAvailableBalance(){
    return this.http.get(`${this.apiUrl}/getAvailableBalance`)
  }
  getUpComingBalance(){
    return this.http.get(`${this.apiUrl}/getUpComingBalance`)
  }
  withdraw(amount:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/withdraw/${amount}`)
  }

  getwithdrawnamount():Observable<any>{
    return this.http.get(`${this.apiUrl}/getwithdrawnamount`)

  }

  CompleteAuctionPayment(itemID:number){
    return this.http.get(`${this.apiUrl}/CompleteAuctionPayment/${itemID}`)
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
    this.loader.show();
    return this.http.get<any>(`${this.apiUrl}/Active`).pipe(
      finalize(()=>{
        this.loader.hide();
      })
    );
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
      this.loader.show();
      return this.http.get<Pagination<Auction[]>>(`${this.apiUrl}/GetAuctions`, { params }).pipe(
        finalize(()=>{
          this.loader.hide();
        })
      );
  }

  // Fetch similar active auctions by category
  getSimilarActiveAuctions(auctionId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/SimilarActiveAuctions/${auctionId}`);
  }
  //get live Auctions for Seller
  getSellerAllLive(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/SellerLive`)
  }
  //get upcoming Auctions for Seller
  getSellerUpcomingAuctions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/SellerUpcoming`)
  }
  //get upcoming Auctions for Seller
  getUpcomingAuctions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/upcomingAuctions`)
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
 CloseAuction(AuctionId:number):Observable<any>{
  return this.http.get<any>(`${this.apiUrl}/Close/${AuctionId}`);
 }

 HomeActive(): Observable<any> {
  this.loader.show();
  return this.http.get<any>(`${this.apiUrl}/HomeActive`).pipe(
    finalize(()=>{
      this.loader.hide();
    })
  );
}
//  getHomeSections():Observable<any>{
//   return this.http.get<any>(`${this.apiUrl}/home`);
// }



}
export interface Auction {
  ItemId: number;
  Duration: number;
  StartDate: Date;
}
