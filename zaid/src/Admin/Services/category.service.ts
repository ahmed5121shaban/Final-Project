import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

private apiUrl="https://localhost:49777/api/Category"

  constructor(private http:HttpClient) { }

  //call api to get categories
  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }
addCategory(formData:FormData):Observable<any>{
 return this.http.post(this.apiUrl,formData);
}

deleteCategory(categoryId:number):Observable<any>{
  return this.http.delete(`${this.apiUrl}/${categoryId}`)
  
}
}
