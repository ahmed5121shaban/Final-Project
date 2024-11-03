import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  getAllEventUrl="api/Event"
  addEventUrl="api/Event"
  getEventDetailsUrl = "api/Event/"
  apiUrl=environment.apiUrl
  getHomeEventUrl = "api/event/home-event"
constructor(private http:HttpClient) { }

AddEvent(formData:any){
  return this.http.post(`${this.apiUrl}${this.addEventUrl}`,formData)
}

GetAllEvent(){
  return this.http.get(`${this.apiUrl}${this.getAllEventUrl}`);
}

GetEventDetails(id:number){
  return this.http.get(`${this.apiUrl}${this.getEventDetailsUrl}${id}`)
}

GetHomeEvent(){
  return this.http.get(`${this.apiUrl}${this.getHomeEventUrl}`)
}

}
