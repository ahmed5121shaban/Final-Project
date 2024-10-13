import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
<<<<<<< HEAD

private apiUrl="https://localhost:5204/api/Category"

=======
 private apiUrl=`${environment.apiUrl}api/Category`
>>>>>>> f7b69d48523f3afa25338e493777eddf024ceb74
  constructor(private http:HttpClient) { }

  //call api to get categories
  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getall`)
  }
addCategory(formData:FormData):Observable<any>{
 return this.http.post(`${this.apiUrl}/Add`,formData);
}

deleteCategory(categoryId:number):Observable<any>{
  return this.http.delete(`${this.apiUrl}/${categoryId}`)

}
}
