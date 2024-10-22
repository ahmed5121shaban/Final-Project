import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  apiUrl = `${environment.apiUrl}api/Review`;

  constructor(private http: HttpClient) { }

  addReview(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, formData); // Ensure '/add' matches your API route
  }
}
