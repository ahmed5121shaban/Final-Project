import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: { text: string; sender: 'buyer' | 'seller'; time: string; date: string; day: string }[] = [];
  newMessage: string = '';
  isAuctionWon: boolean = true; // Set to true for testing; adjust based on actual auction status
  showEmojiPicker: boolean = false;
  emojis: string[] = ['😊', '😂', '😍', '🥺', '😎', '😢', '😜', '😉', '😇', '🤔']; // Expanded emoji list

  ngOnInit() {
    // Simulate initial messages for demonstration
    if (this.isAuctionWon) {
      this.messages = [
        { text: 'Congratulations on winning the auction!', sender: 'seller', time: '23:58', date: this.formatDate(new Date()), day: this.formatDay(new Date()) },
        { text: 'Thank you! I’m excited to proceed.', sender: 'buyer', time: '23:59', date: this.formatDate(new Date()), day: this.formatDay(new Date()) },
        { text: 'Please provide your contact details so we can arrange the delivery.', sender: 'seller', time: '00:01', date: this.formatDate(new Date()), day: this.formatDay(new Date()) },
        { text: 'Sure, here are my details...', sender: 'buyer', time: '00:02', date: this.formatDate(new Date()), day: this.formatDay(new Date()) }
      ];
    }
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        text: this.newMessage,
        sender: 'buyer', // Adjust based on who is sending the message
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: this.formatDate(new Date()),
        day: this.formatDay(new Date())
      });
      this.newMessage = '';
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (file.type.startsWith('image/')) {
          this.messages.push({
            text: `<img src="${reader.result}" alt="file" style="max-width: 100%; height: auto;">`,
            sender: 'buyer',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: this.formatDate(new Date()),
            day: this.formatDay(new Date())
          });
        } else {
          this.messages.push({
            text: `<a href="${reader.result}" download="${file.name}">Download ${file.name}</a>`,
            sender: 'buyer',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: this.formatDate(new Date()),
            day: this.formatDay(new Date())
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  selectEmoji(emoji: string) {
    this.newMessage += emoji;
    this.showEmojiPicker = false;
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.sendMessage();
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString(); // e.g., "8/16/2024"
  }

  formatDay(date: Date): string {
    return date.toLocaleDateString('en-US', { weekday: 'long' }); // e.g., "Friday"
  }
}
