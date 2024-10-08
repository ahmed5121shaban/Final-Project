import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

private apiUrl="http://localhost:5204/api/Item"

  constructor(private http:HttpClient) { }

  
addItem(formData:FormData):Observable<any>{
 return this.http.post(this.apiUrl,formData);
}

getPendingItems(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/Pending`);
}
getAcceptedItems(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/Accepted`);
}
getRejectedItems(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/Rejected`);
}


getItemById(id:number):Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${id}`);

}



deleteItem(itemId:number):Observable<any>{
  return this.http.delete(`${this.apiUrl}/delete/${itemId}`);
 }

}


