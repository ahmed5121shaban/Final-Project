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
  private apiUrl=`${environment.apiUrl}api/Auction`


  constructor(private cookieService: CookieService,private http:HttpClient) {}

  createAuction(auction:Auction): Observable<any> {
    return this.http.post(this.apiUrl,auction)
  }

  getAll():any{
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
  
    // Fetch paginated auctions from the API
    getPaginatedAuctions(
      searchtxt: string = '', 
      columnName: string = 'Id', 
      isAscending: boolean = false, 
      pageSize: number = 2, 
      pageNumber: number = 1
    ): Observable<Pagination<any[]>> {
      // Build query parameters
      let params = new HttpParams()
        .set('searchtxt', searchtxt)
        .set('columnName', columnName)
        .set('isAscending', isAscending.toString())
        .set('pageSize', pageSize.toString())
        .set('pageNumber', pageNumber.toString());
  
      // Make HTTP GET request
      return this.http.get<Pagination<any[]>>(`${this.apiUrl}/GetAuctions`, { params });
    }
  //get live Auctions for Seller
  getSellerAllLive():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/SellerLive`)
  }

 

}
export interface Auction{
  ItemId:number;
  Duration:number;
  StartDate:Date;
}
