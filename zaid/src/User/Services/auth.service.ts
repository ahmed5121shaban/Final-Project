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

  loginUser(value:any){
    return this.http.post("http://localhost:63280/api/acount/login",value);
  }

  registerUser(userDetails: any){
    /* const users = this.getUsersFromLocalStorage();
    users.push(userDetails);
    this.setUsersToLocalStorage(users);
    return of(userDetails); */
    return this.http.post("http://localhost:63280/api/Acount/register",userDetails);
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

