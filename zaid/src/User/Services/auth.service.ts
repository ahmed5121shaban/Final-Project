// import { Injectable } from '@angular/core';
// import { User } from '../interface/auth';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
// import { of } from 'rxjs/internal/observable/of';
// import { Observable } from 'rxjs/internal/Observable';
// import { CookieService } from 'ngx-cookie-service';
// import { environment } from '../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private localStorageKey = 'token';
//   isLoggedUserSubject = new BehaviorSubject<boolean>(this.cookieService.get('token')!='')
//   roleSubject = new BehaviorSubject<string[]>(
//     this.cookieService.get("token")!=''
//       ? JSON.parse(atob(this.cookieService.get("token").split('.')[1]))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
//       : [""]
//   );

//   apiUrl=environment.apiUrl;

//   constructor(private http:HttpClient,private cookieService: CookieService) {

//   }

// get isLoggedIn(){
//   if(this.cookieService.get(this.localStorageKey)){

//     return true}
//   return false

//   }

//   loginUser(value: any) {
//     return this.http.post(`${this.apiUrl}api/acount/login`, value);
//   }

//   registerUser(userDetails: any) {

//     return this.http.post(`${this.apiUrl}api/Acount/register`, userDetails);
//   }

//   updateUserPassword(email: string, newPassword: string): Observable<boolean> {
//     const users = this.getUsersFromCookie();
//     const userIndex = users.findIndex(user => user.email === email);

//     if (userIndex !== -1) {
//       users[userIndex].password = newPassword;
//       this.setUsersToCookie(users);
//       return of(true);
//     } else {
//       return of(false);
//     }
//   }

//   getUserByEmail(email: string): Observable<User[]> {
//     const users = this.getUsersFromCookie();
//     const filteredUsers = users.filter(user => user.email === email);
//     return of(filteredUsers);
//   }

//   private getUsersFromCookie(): User[] {
//     const usersJson = this.cookieService.get(this.localStorageKey);
//     return usersJson ? JSON.parse(usersJson) : [];
//   }

//   private setUsersToCookie(users: User[]): void {
//     this.cookieService.set(this.localStorageKey, JSON.stringify(users));

//   }
// }

import { Injectable } from '@angular/core';
import { User } from '../interface/auth';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private localStorageKey = 'token';
  isLoggedUserSubject = new BehaviorSubject<boolean>(
    this.cookieService.get('token') != ''
  );
  roleSubject = new BehaviorSubject<string[]>(
    /* [''] */
    this.cookieService.get("token") != ''
      ? JSON.parse(atob(this.cookieService.get("token").split('.')[1]))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      : [""]
  );

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private toaster: ToastrService,
    private router: Router
  ) {}
  getCurrentUserId(): string | null {
    const token = this.cookieService.get("token");
    if (!token) {
      console.error("Token not found in cookies.");
      return null;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  get isLoggedIn() {
    return !!this.cookieService.get(this.localStorageKey);
  }

  loginUser(value: any) {
    this.cookieService.delete('token');
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    return this.http.post(`${this.apiUrl}api/acount/login`, value);
  }

  getUserRoleFromToken(token: string): string[] {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return (
      payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
      []
    );
  }

  registerUser(userDetails: any) {
    return this.http.post(`${this.apiUrl}api/Acount/register`, userDetails);
  }

  updateUserPassword(email: string, newPassword: string): Observable<boolean> {
    const users = this.getUsersFromCookie();
    const userIndex = users.findIndex((user) => user.email === email);

    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      this.setUsersToCookie(users);
      return of(true);
    } else {
      return of(false);
    }
  }

  getUserByEmail(email: string): Observable<User[]> {
    const users = this.getUsersFromCookie();
    const filteredUsers = users.filter((user) => user.email === email);
    return of(filteredUsers);
  }

  private getUsersFromCookie(): User[] {
    const usersJson = this.cookieService.get(this.localStorageKey);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private setUsersToCookie(users: User[]): void {
    this.cookieService.set(this.localStorageKey, JSON.stringify(users));
  }

  logout() {
    this.cookieService.delete('token');
    this.isLoggedUserSubject.next(false);
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.toaster.success('you Logout now');
    this.router.navigate(['/login']);
  }
}
