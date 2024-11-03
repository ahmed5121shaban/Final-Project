import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiUrl=`${environment.apiUrl}api/Item`

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
   editItem(updatedData: FormData): Observable<any> {
    return this.http.patch(`${this.apiUrl}/edit`, updatedData);
  }
  getItem(itemId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${itemId}`);
  }
  getUnreviewdItems():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/Unreviewed`);
  }

  AcceptItem(itemId:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/Accept/${itemId}`)
  }
  // RejecttItem(itemId:number,message:string):Observable<any>{

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });
  //   return this.http.put(`${this.apiUrl}/Reject/${itemId}`,message,{headers})
  // }

  rejectItem(itemId: number, rejectReason: string): Observable<any> {
    const url = `${this.apiUrl}/Reject/${itemId}`;
    return this.http.post(url, JSON.stringify(rejectReason), {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
}


  }


