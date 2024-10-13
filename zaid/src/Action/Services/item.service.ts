import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

private apiUrl="https://localhost:5204/api/Item"

  constructor(private http:HttpClient) { }

  
addItem(formData:FormData):Observable<any>{
 return this.http.post(this.apiUrl,formData);
}
deleteItem(itemId:number):Observable<any>{
  return this.http.delete(`${this.apiUrl}/delete/${itemId}`);
 }


}


