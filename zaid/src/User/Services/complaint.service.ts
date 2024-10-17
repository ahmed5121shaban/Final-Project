import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seller } from '../interface/seller';
import { environment } from '../../environments/environment';
import { ComplaintResponse } from '../interface/complaint'; // استيراد ../interface/complaint';

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

  // الحصول على قائمة الشكاوى
  getComplaints(page: number, filters: any): Observable<ComplaintResponse> {
    return this.http.get<ComplaintResponse>(`${this.apiUrl}/list`, {
      params: {
        pageNumber: page.toString(),
        ...filters
      }
    });
  }

  // إضافة شكوى
  addComplaint(complaintData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/complaints`, complaintData);
  }
}
