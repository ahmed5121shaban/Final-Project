import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BidService {
private apiUrl =`${environment.apiUrl}api/Bid`;

constructor(private cookieService :CookieService,private http :HttpClient) { }
 
 //get auction's highest bid 
 getHighestBid(auctionId :number):Observable<any>{
  return this.http.get<any>(`${this.apiUrl}/GethighestBid/${auctionId}`)
}

}
