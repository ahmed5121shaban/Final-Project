import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  messages: { text: string; sender: 'buyer' | 'seller'; time: string; date: string; day: string; senderName: string }[] = [];
  newMessage: string = '';
  searchTerm: string = '';
  selectedMessageIndex: number | null = null;
  showEmojiPicker: boolean = false;
  emojis: string[] = ['😊', '😂', '😍', '🥺', '😎', '😢', '😜', '😉', '😇', '🤔'];
  filteredMessages: { text: string; sender: 'buyer' | 'seller'; time: string; date: string; day: string; senderName: string }[] = [];
  otherConversationMessages: { text: string; sender: 'buyer' | 'seller'; time: string; date: string; day: string; senderName: string }[] = [
    { text: 'هذا هو نص الرسالة من محادثة أخرى', sender: 'seller', time: '12:30', date: '10 August 2024', day: 'Saturday', senderName: 'Other Seller' }
  ];
  isSmallScreen: boolean = false;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit() {
    this.initializeMessages();
    this.updateFilteredMessages();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isSmallScreen = window.innerWidth < 768;
      this.fileInput.nativeElement.addEventListener('change', (event) => this.onFileChange(event));
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (isPlatformBrowser(this.platformId)) {
      this.isSmallScreen = window.innerWidth < 768;
    }
  }

  initializeMessages() {
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    const formattedDay = this.formatDay(currentDate);

    this.messages = [
      { text: 'Congratulations on winning the auction!', sender: 'seller', time: '23:58', date: formattedDate, day: formattedDay, senderName: 'Seller' },
      { text: 'Thank you! I’m excited to proceed.', sender: 'buyer', time: '23:59', date: formattedDate, day: formattedDay, senderName: 'Buyer' },
      { text: 'Please provide your contact details so we can arrange the delivery.', sender: 'seller', time: '00:01', date: formattedDate, day: formattedDay, senderName: 'Seller' },
      { text: 'Sure, here are my details...', sender: 'buyer', time: '00:02', date: formattedDate, day: formattedDay, senderName: 'Buyer' }
    ];

    this.updateFilteredMessages();
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.newMessage.trim()) {
      this.sendMessage();
    } else if (event.key === 'ArrowUp') {
      this.scrollChatMessages('up');
    } else if (event.key === 'ArrowDown') {
      this.scrollChatMessages('down');
    }
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        text: this.newMessage,
        sender: 'buyer',
        time: new Date().toLocaleTimeString(),
        date: this.formatDate(new Date()),
        day: this.formatDay(new Date()),
        senderName: 'Buyer'
      });
      this.newMessage = '';
      this.updateFilteredMessages();
    }
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  selectEmoji(emoji: string) {
    this.newMessage += emoji;
    this.showEmojiPicker = false;
  }

  onFileChange(event: Event) {
    if (isPlatformBrowser(this.platformId)) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          let fileContent;
          const fileType = file.type;

          if (fileType.startsWith('image/')) {
            fileContent = `<img src="${e.target.result}" alt="file" class="file-message" />`;
          } else if (fileType === 'application/pdf') {
            fileContent = `<iframe src="${e.target.result}" class="file-message" frameborder="0"></iframe>`;
          } else {
            fileContent = `<a href="${e.target.result}" download="${file.name}">Download ${file.name}</a>`;
          }

          this.messages.push({
            text: fileContent,
            sender: 'buyer',
            time: new Date().toLocaleTimeString(),
            date: this.formatDate(new Date()),
            day: this.formatDay(new Date()),
            senderName: 'Buyer'
          });
          this.updateFilteredMessages();
        };
        reader.readAsDataURL(file);
      }
    }
  }

  updateFilteredMessages() {
    this.filteredMessages = [
      ...this.messages.filter(msg =>
        msg.text.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        msg.senderName.toLowerCase().includes(this.searchTerm.toLowerCase())
      ),
      ...this.otherConversationMessages
    ];
  }

  scrollChatMessages(direction: 'up' | 'down') {
    if (isPlatformBrowser(this.platformId)) {
      const chatMessagesContainer = document.querySelector('.chat-messages');
      if (chatMessagesContainer) {
        const scrollAmount = direction === 'up' ? -50 : 50;
        chatMessagesContainer.scrollBy({
          top: scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  }

  handleSearchClick(index: number) {
    this.selectedMessageIndex = index;
    this.scrollToMessage(index);
  }

  scrollToMessage(index: number) {
    if (isPlatformBrowser(this.platformId)) {
      const messageElement = document.getElementById(`message-${index}`);
      if (messageElement) {
        messageElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }

  formatDay(date: Date): string {
    return date.toLocaleDateString(undefined, { weekday: 'long' });
  }

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
