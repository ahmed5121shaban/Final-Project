import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../../Admin/Services/category.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
 private apiUrl = `${environment.apiUrl}api/Auction`
  constructor(private cookieService: CookieService, private http: HttpClient,private categoryServic:CategoryService) { }


  
}
