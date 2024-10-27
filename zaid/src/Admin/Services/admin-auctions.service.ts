import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination } from '../../Action/Models/models/pagination.model';
import { Auction } from '../../Action/Services/auction.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuctionsService {
  private apiUrl = `${environment.apiUrl}api/Auction`
  constructor(private http: HttpClient) { }

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
  
      return this.http.get<Pagination<Auction[]>>(`${this.apiUrl}/GetAuctionForAdmin`, { params });
  }
}
