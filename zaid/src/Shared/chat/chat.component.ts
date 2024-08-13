import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface Message {
  sender: string;
  text: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';
  currentUser: string = 'Buyer'; // Change this to 'Seller' when logged in as seller
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    // Simulate fetching messages from a server
    this.messages = [
      { sender: 'Seller', text: 'Hello, how can I help you?' },
      { sender: 'Buyer', text: 'I have a question about the auction.' },
      { sender: 'Seller', text: 'Sure, what would you like to know?' }
    ];
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        sender: this.currentUser,
        text: this.newMessage
      });
      this.newMessage = '';
      this.scrollToBottom();
      // Send message to the server
      // this.chatService.sendMessage(this.newMessage);
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    }, 0);
  }
}
