import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private baseUrl = 'http://localhost:5204/api/Acount'; // استبدل هذا بالرابط الحقيقي للباك إند
private baseUrl = `${environment.apiUrl}api/Acount`
  constructor(private http: HttpClient) {}

  // إرسال بيانات الملف الشخصي
updateProfile(data: FormData): Observable<any> {
  return this.http.put(`${this.baseUrl}/profile`, data, { responseType: 'text' }).pipe(
    catchError((error) => {
      console.error('Error updating profile:', error);
      return throwError(error); // Re-throw the error so it can be handled by the caller
    })
  );
}

updateAddress(data: FormData): Observable<any> {
  return this.http.put(`${this.baseUrl}/profile/address`, data, { responseType: 'text' }).pipe(
    catchError((error) => {
      console.error('Error updating profile:', error);
      return throwError(error); // Re-throw the error so it can be handled by the caller
    })
  );
}
  // إرسال بيانات التحقق من الهوية
  verifyIdentity(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/VerifyIdentity`, data)
  }

  getProfileData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile`)
  }

  getUserProfile(userId:string):Observable<any>{
    return this.http.get<any>(`http://localhost:5204/api/Acount/UserProfile/${userId}`)
  }
  
  getUserData(): Observable<any>{
  return this.http.get<any>(`http://localhost:5204/api/Acount/UserData`);
  }
  getUserCurrency(): Observable<any>{
    return this.http.get<any>(`http://localhost:5204/api/Acount/userCurrency`);
    }
 
}
