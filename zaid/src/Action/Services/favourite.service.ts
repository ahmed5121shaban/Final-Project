import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  private apiUrl=`${environment.apiUrl}api/favAuctions`

  constructor(private http:HttpClient) { }

  addAuctionToFav(auctionId:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/add/${auctionId}`);
  }
  getAllFavIds():Observable<any>{
    return this.http.get(`${this.apiUrl}/getfavauctionids`);
  }
  getAllActiveFavs():Observable<any>{
    return this.http.get(`${this.apiUrl}/getallactivefav`);
  }
  getAllEndedFavs():Observable<any>{
    return this.http.get(`${this.apiUrl}/getallendedfav`);
  }
  getAllUpcomingFavs():Observable<any>{
    return this.http.get(`${this.apiUrl}/getallupcomingfav`);
  }
removeFavAuction(auctionId:number):Observable<any>{
return this.http.delete(`${this.apiUrl}/delete/${auctionId}`)
}

deleteAllFav(){
  return this.http.get(`${this.apiUrl}/deleteALL`)

}


}
