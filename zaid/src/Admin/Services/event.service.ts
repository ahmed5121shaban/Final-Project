import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  addEventUrl="api/Event"
  apiUrl=environment.apiUrl
constructor(private http:HttpClient) { }

AddEvent(formData:any){
  console.log(formData);
  console.log(`${this.apiUrl}${this.addEventUrl}`);
  return this.http.post(`${this.apiUrl}${this.addEventUrl}`,formData)
}

}
