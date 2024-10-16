import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavCategoryService {
private apiUrl=`${environment}/api/favCategory`
  constructor(private http: HttpClient,private cookieService:CookieService) { }

  
}
