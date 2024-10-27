import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
apiUrl = environment.apiUrl;
getAllChatsUrl = "api/chat/chats";
getAllMessageUrl = "api/message/messages/"
constructor(private http:HttpClient) { }
getAllChats(){
  return this.http.get(`${this.apiUrl}${this.getAllChatsUrl}`)
}
getAllMessagesByChatID(chatID:number){
  return this.http.get(`${this.apiUrl}${this.getAllMessageUrl}${chatID}`)
}
}
