import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5204/api/Acount'; // استبدل هذا بالرابط الحقيقي للباك إند

  constructor(private http: HttpClient) {}

  // إرسال بيانات الملف الشخصي
  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/profile`, data);
  }

  // إرسال بيانات التحقق من الهوية
  verifyIdentity(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/verify-identity`, data);
  }
  getProfileData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile`); // تأكد من أن هذا هو الـ endpoint الصحيح
  }
}
