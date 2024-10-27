import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
apiUrl = environment.apiUrl;
allNotificationsUrl = "api/notification"
constructor(private http:HttpClient) { }
GetAllNotifications(){
  return this.http.get(`${this.apiUrl}${this.allNotificationsUrl}`);
}
}
