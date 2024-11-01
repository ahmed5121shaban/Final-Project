import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChatService } from '../../Services/chat/chat.service';
import { ActivatedRoute } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { CookieService } from 'ngx-cookie-service';

export interface message {
  chatId: number;
  message: string;
  time: string;
  userImage: string;
  userName: string;
  sender: boolean;
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css','../chat.component.css'],
})
export class MessageComponent implements OnInit {
  messages: {
    text: string;
    sender: 'buyer' | 'seller';
    time: string;
    date: any;
    senderName: string;
  }[] = [];
  newMessage: string = '';
  selectedMessageIndex: number | null = null;
  searchTerm: string = '';
  chatID!: number;
  allMessages!: message[];
  hubConnection!: signalR.HubConnection;
  audio = new Audio();

  constructor(
    private chatService: ChatService,
    private router: ActivatedRoute,
    private cookieService: CookieService
  ) {
    this.router.params.subscribe((param) => {
      this.chatID = param['id'];
    });
    this.audio.src = 'audio/mixkit-message-pop-alert-2354.mp3';
  }

  ngOnInit() {
    this.openConnectionAndGetAllBidsWithLast();
    this.GetAllMessageByChatID();
  }

  GetAllMessageByChatID() {
    this.chatService.getAllMessagesByChatID(this.chatID).subscribe({
      next: (res: any) => {
        this.allMessages = res.result;
      },
      error: (err) => console.log(err),
    });
  }

  sendMessage(message: string) {
    this.hubConnection
      .invoke('SendMessage', this.chatID, message)
      .then(() => {
        console.log('Message sent successfully');
        this.chatService.newMessage.next(true);
      })
      .catch((err) => {
        console.log('Error sending message: ', err);
      });
  }

  openConnectionAndGetAllBidsWithLast() {
    let token = this.cookieService.get('token');
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`http://localhost:5204/chatHub?chatID=${this.chatID}`, {
        accessTokenFactory: () => token,
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true,
      })
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR Connection started');
        this.hubConnection.on('getMessages', (res) => {
          this.allMessages.push(res);
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
}
