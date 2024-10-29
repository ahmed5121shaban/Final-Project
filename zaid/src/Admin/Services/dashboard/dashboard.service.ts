import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
apiUrl=environment.apiUrl;
endedCompletedAuctionUrl = "api/Dashboard/ended-completed-auctions"
allAuctionsAmountsUrl = "api/Dashboard/auctions-amounts";
categoriesItemsUrl = "api/Dashboard/categories";
topFiveSellersUrl = "api/Dashboard/top-five-sellers";
auctionsBidsAmountsUrl = "api/Dashboard/auctions-bids-amounts"
constructor(private http:HttpClient) { }
getEndedCompletedAuctionCount(){
  return this.http.get(`${this.apiUrl}${this.endedCompletedAuctionUrl}`)
}
getAllAuctionsAmounts(){
  return this.http.get(`${this.apiUrl}${this.allAuctionsAmountsUrl}`)
}

getCategoriesItems(){
  return this.http.get(`${this.apiUrl}${this.categoriesItemsUrl}`)
}
getTopFiveSellers(){
  return this.http.get(`${this.apiUrl}${this.topFiveSellersUrl}`)
}
getAuctionsBidsAmount(){
  return this.http.get(`${this.apiUrl}${this.auctionsBidsAmountsUrl}`)
}

}
