import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SellerProfile {
  userId: string;
  email: string;
  imageUrl: string;
  completedAuctions: number;
  unfinishedAuctions: number;
  sellerRating: number;
  profileCompletion: number;
  items: Array<{
    id: number;
    name: string;
    category: string;
    status: string;
    description : string;
    images: string[];

  }>;
}

export interface BuyerProfile {
  userId: string;
  name: string;
  email: string;
  imageUrl: string;
  wonAuctions: number;
  lostAuctions: number;
  profileCompletion: number;
  auctions: Array<{
    id: number;
    startDate: Date;
    endDate: Date;
    itemID: number;
    item: {
      id: number;
      startPrice: number;
      status: string;
      name: string;
      addTime: Date;
      images: string[];
      description: string;
      categoryID: number;
      category: string;
      sellerId: string;
      sellerName: string;
    };
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = environment.apiUrl;
  private sellerProfileUrl = `${this.apiUrl}api/profile-review/seller-profile`;
  private buyerProfileUrl = `${this.apiUrl}api/profile-review/buyer-profile`;
  

  constructor(private http: HttpClient) {}

  getSellerProfile(userId: string): Observable<SellerProfile> {
    return this.http.get<SellerProfile>(`${this.sellerProfileUrl}/${userId}`);
  }

  getBuyerProfile(userId: string): Observable<BuyerProfile> {
    return this.http.get<BuyerProfile>(`${this.buyerProfileUrl}/${userId}`);
  }
}
