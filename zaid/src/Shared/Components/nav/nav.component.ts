import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../Services/notification.service';
import { Location } from '@angular/common';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../../User/Services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { ChatService } from '../../Services/chat/chat.service';

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
export class NavComponent implements OnInit  {
  hubConnection!: signalR.HubConnection;
  allNotifications!: Notification[];
  alert!: boolean;
  messageAlert!:boolean
  audio = new Audio();
  searchtxt:string="";
  isLoggedIn!:boolean;
  role :string="";
  constructor(
    private cookieService: CookieService,
    private toaster: ToastrService,
    private notificationService: NotificationService,
    private location:Location,
    private router:Router,
    private authService:AuthService,
    private chatService: ChatService,


  ) {
    this.audio.src = 'audio/mixkit-correct-answer-tone-2870.wav';
    this.authService.isLoggedUserSubject.next(this.cookieService.get("token")!='')
    this.authService.roleSubject.subscribe({
      next:(roles)=>{
        console.log("userroles",roles);
        this.role = roles.find(role=>role==="Admin") || "";
        console.log("isadmin?",this.role);

      },
      error:err=>{
        console.log(err);

      }
    });

  }

  ngOnInit() {
    this.authService.isLoggedUserSubject.subscribe({
      next:(res)=>{
        this.isLoggedIn=res
      },error:(err)=>console.log(err)

    });
    this.openConnectionAndGetAllBidsWithLast();
    this.hubConnection.on('threeNotification', (res: Notification[]) => {
      this.allNotifications=res;
    });
    this.chatService.newMessage.subscribe((res)=>{
      this.messageAlert = res
    })
  }


  logOut() {
    this.authService.logout();
    this.authService.roleSubject.next([''])
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
      .then(()=>{
        console.log('SignalR Connection started');
        return this.hubConnection.invoke("lastThreeNotification");
      })
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
  removeMessageNotify(){
    this.messageAlert = false;
  }
  onSearch() {
    if (this.searchtxt.trim()) {
      this.router.navigate(['../action/auction-list', this.searchtxt]);    }
}


}
