import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seller } from '../interface/seller';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private apiUrl = environment.apiUrl + 'api/Complain'; // استخدم apiUrl من environment

  constructor(private http: HttpClient) {}

  // الحصول على قائمة البائعين
  getSellers(): Observable<Seller[]> {
    return this.http.get<Seller[]>(`${this.apiUrl}/sellers`);
  }

  // إضافة شكوى
  addComplaint(complaintData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/complaints`, complaintData);
  }
}
