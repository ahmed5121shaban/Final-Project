import { Injectable } from '@angular/core';
import { User } from '../interface/auth';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private localStorageKey = 'users';

  constructor() { }

  registerUser(userDetails: User): Observable<User> {
    const users = this.getUsersFromLocalStorage();
    users.push(userDetails);
    this.setUsersToLocalStorage(users);
    return of(userDetails);
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

