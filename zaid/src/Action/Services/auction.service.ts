import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  private apiUrl="http://localhost:5204/api/Auction"

  constructor(private http:HttpClient) { }

  createAuction(auction:Auction): Observable<any> {
    return this.http.post(this.apiUrl,auction)
  }

  getAll():any{
    return this.http.get<any>(`${this.apiUrl}/getall`)
  }
}
export interface Auction{
  ItemId:number;
  Duration:number;
  StartDate:Date;
}
