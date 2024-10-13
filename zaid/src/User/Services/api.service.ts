import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5204/api/Acount'; // استبدل هذا بالرابط الحقيقي للباك إند

  constructor(private http: HttpClient) {}

  // إرسال بيانات الملف الشخصي
  updateProfile(data: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/profile`, data, { responseType: 'text' })
  }

  // إرسال بيانات التحقق من الهوية
  verifyIdentity(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/VerifyIdentity`, data)
  }

  getProfileData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile`)
  }

 
  
  
}
