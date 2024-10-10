import { Injectable } from '@angular/core';
import { User } from '../interface/auth';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/internal/Observable';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private localStorageKey = 'token';
  isLoggedUserSubject!: BehaviorSubject<boolean>


  constructor(private http:HttpClient,private cookieService: CookieService) { }

get isLoggedIn(){
  if(this.cookieService.get(this.localStorageKey)){

    return true}
  return false

  }

  loginUser(value: any) {
    return this.http.post("http://localhost:5204/api/acount/login", value);
  }

  registerUser(userDetails: any) {
    /* const users = this.getUsersFromLocalStorage();
    users.push(userDetails);
    this.setUsersToLocalStorage(users);
    return of(userDetails); */
    return this.http.post("http://localhost:5204/api/Acount/register", userDetails);
  }

  updateUserPassword(email: string, newPassword: string): Observable<boolean> {
    const users = this.getUsersFromCookie();
    const userIndex = users.findIndex(user => user.email === email);

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
    const filteredUsers = users.filter(user => user.email === email);
    return of(filteredUsers);
  }

  private getUsersFromCookie(): User[] {
    const usersJson = this.cookieService.get(this.localStorageKey);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private setUsersToCookie(users: User[]): void {
    this.cookieService.set(this.localStorageKey, JSON.stringify(users));

  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
// import { CookieService } from 'ngx-cookie-service';
// import { User } from '../interface/auth';
// import { catchError, tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private localStorageKey = 'token';
//   isLoggedUserSubject = new BehaviorSubject<boolean>(this.isLoggedIn);

//   constructor(private http: HttpClient, private cookieService: CookieService) {}

//   get isLoggedIn(): boolean {
//     return !!this.cookieService.get(this.localStorageKey);
//   }

//   loginUser(value: any): Observable<any> {
//     return this.http.post("http://localhost:5204/api/acount/login", value).pipe(
//       tap((response: any) => {
//         if (response && response.token) {
//           this.cookieService.set(this.localStorageKey, response.token, {
//             expires: 7,
//             secure: true,
//             sameSite: 'Strict',
//             path: '/'
//           });
//           this.isLoggedUserSubject.next(true);
//         }
//       }),
//       catchError(error => {
//         console.error('Login error:', error);
//         return throwError(() => new Error('Login failed'));
//       })
//     );
//   }

//   registerUser(userDetails: any): Observable<any> {
//     return this.http.post("http://localhost:5204/api/Acount/register", userDetails);
//   }

//   logoutUser(): void {
//     this.cookieService.delete(this.localStorageKey);
//     this.isLoggedUserSubject.next(false);
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
