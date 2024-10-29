import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavCategoryService {
private apiUrl=`${environment.apiUrl}api/favCategory`
constructor(private http: HttpClient,private cookieService:CookieService) { }

AddToFav(categoryId:number):Observable<any>{
 return this.http.post(`${this.apiUrl}`,categoryId);
}
getFavCatIds():Observable<any>{
  return this.http.get(`${this.apiUrl}`);

}
getFavCat():Observable<any>{
  return this.http.get(`${this.apiUrl}/allfav`);
}
  
}
