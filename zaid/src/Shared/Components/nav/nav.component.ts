import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../Services/notification.service';
import { Location } from '@angular/common';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../../User/Services/auth.service';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  time: string;
  title: number;
  description: string;
  subjectName: string;
  isReaded: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  hubConnection!: signalR.HubConnection;
  allNotifications!: Notification[];
  alert!: boolean;
  audio = new Audio();
  searchtxt:string="";
  islogged:boolean=false;
  constructor(
    private cookieService: CookieService,
    private toaster: ToastrService,
    private notificationService: NotificationService,
    private location:Location,
    private router:Router,
    private authService:AuthService,

    
  ) {
    this.audio.src = 'audio/mixkit-correct-answer-tone-2870.wav';
  }

  ngOnInit() {
    this.openConnectionAndGetAllBidsWithLast();
    this.notificationService.GetAllNotifications().subscribe({
      next: (res: any) => {
        this.allNotifications = res.result.reverse();
        console.log(res);
      },
    });
    // if(this.authService.isLoggedIn){
    //   this.islogged = true;
    // }
  
  }

  logOut() {
    this.cookieService.delete('token');
    this.cookieService.delete('auth');


    this.toaster.success('you Logout now');
    this.router.navigate(['../user/login']);
    this.islogged =false;
  
  }

  openConnectionAndGetAllBidsWithLast() {
    let token = this.cookieService.get('token');
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5204/notificationHub', {
        accessTokenFactory: () => token,
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true,
      })
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR Connection started');
        this.hubConnection.on('notification', (res: Notification) => {
          this.alert = true;
          this.allNotifications.unshift(res);
          this.audio.load();
          this.audio.play().catch((err) => {
            console.error('Error playing sound:', err);
          });
        });
      })
      .catch((err) => {
        console.log('SignalR Connection Error: ', err);
      });
  }
  removeNotify() {
    this.alert = false;
  }

  onSearch() {
    if (this.searchtxt.trim()) {
      this.router.navigate(['../action/auction-list', this.searchtxt]);    }
}


}