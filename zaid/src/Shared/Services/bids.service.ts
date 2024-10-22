import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BidsService {

  private hubConnection: signalR.HubConnection | undefined;

  constructor() {}

  public startConnection(auctionId: string): void {
    let hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${environment.apiUrl}/bidHub`)
        .build();

      hubConnection
        .start()
        .then(() => {
          hubConnection.invoke('JoinGroup', auctionId).catch((err) => console.error(err));
        })
        .catch((err) => console.error('SignalR Connection Error: ', err));
  }



  public stopConnection(): void {
    this.hubConnection?.stop().then(() => {
      console.log('Connection stopped');
    });
  }

}
