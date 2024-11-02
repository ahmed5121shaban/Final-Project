import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

private apiUrl=`${environment.apiUrl}api/Category`

  constructor(private http:HttpClient) { }

  //call api to get categories
  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getall`)
  }
  getOneCategory(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetById/${id}`)
  }
  //call api to get categories
  getCategoriesfilter(searchtxt:string=''): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Filter/${searchtxt}`)
  }
addCategory(formData:FormData):Observable<any>{
 return this.http.post(`${this.apiUrl}/Add`,formData);
}
updateCategory(formData: FormData) {
  return this.http.post(`${this.apiUrl}/Edit`, formData);
}

deleteCategory(categoryId:number):Observable<any>{
  return this.http.delete(`${this.apiUrl}/Delete/${categoryId}`)

}
}
