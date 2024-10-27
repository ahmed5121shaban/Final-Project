import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  [key: string]: any; // إضافة نوع فهرسي (Index Signature)

}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private getAllUsersUrl = "api/users"; // Endpoint لتحميل جميع المستخدمين
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // جلب جميع المستخدمين بدون pagination أو فلترة من الـBackend
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}${this.getAllUsersUrl}`);
  }

  // جلب مستخدم بواسطة ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}${this.getAllUsersUrl}/${id}`);
  }
}
