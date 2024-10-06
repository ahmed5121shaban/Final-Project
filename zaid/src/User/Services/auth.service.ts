import { Injectable } from '@angular/core';
import { User } from '../interface/auth';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private localStorageKey = 'token';
  isLoggedUserSubject!: BehaviorSubject<boolean>

  constructor(private http:HttpClient) { }

get isLoggedIn(){
  if(localStorage.getItem(this.localStorageKey)){
    
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
    const users = this.getUsersFromLocalStorage();
    const userIndex = users.findIndex(user => user.email === email);

    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      this.setUsersToLocalStorage(users);
      return of(true);
    } else {
      return of(false);
    }
  }

  getUserByEmail(email: string): Observable<User[]> {
    const users = this.getUsersFromLocalStorage();
    const filteredUsers = users.filter(user => user.email === email);
    return of(filteredUsers);
  }

  private getUsersFromLocalStorage(): User[] {
    const usersJson = localStorage.getItem(this.localStorageKey);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private setUsersToLocalStorage(users: User[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }


}

