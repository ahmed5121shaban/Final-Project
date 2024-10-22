import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private apiUrl = `${environment.apiUrl}api/Shipment`

  constructor(private http: HttpClient) { }
  getDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetShipmentDetails/${id}`);
  }
  
  updateShipmentStatus(id: number, newStatus: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/UpdateShipmentStatus?id=${id}&newStatus=${newStatus}`, {});
  }

}
