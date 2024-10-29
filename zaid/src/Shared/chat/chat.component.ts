import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChatService } from '../Services/chat/chat.service';

export interface chat{
   id :number,
   senderID :string
   receiverID :string
   messageDate :any
   isActive :boolean
   senderImage :string
   receiverImage :string
   senderName :string
   receiverName :string
   lastMessage:string
}


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {

  allChats!:chat[];
  messages: { text: string; sender: 'buyer' | 'seller'; time: string; date: string; day: string; senderName: string }[] = [];
  newMessage: string = '';
  searchTerm: string = '';
  selectedMessageIndex: number | null = null;
/*   showEmojiPicker: boolean = false;
  emojis: string[] = ['😊', '😂', '😍', '🥺', '😎', '😢', '😜', '😉', '😇', '🤔'];*/
  filteredMessages: { text: string; sender: 'buyer' | 'seller'; time: string; date: string; day: string; senderName: string }[] = [];
  otherConversationMessages: { text: string; sender: 'buyer' | 'seller'; time: string; date: string; day: string; senderName: string }[] = [
    { text: 'هذا هو نص الرسالة من محادثة أخرى', sender: 'seller', time: '12:30', date: '10 August 2024', day: 'Saturday', senderName: 'Other Seller' }
  ];
  isSmallScreen: boolean = false;

/*   @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
 */
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private chatService : ChatService) {
    // Check if the platform is a browser before accessing window
    this.isSmallScreen = isPlatformBrowser(this.platformId) && window.innerWidth < 768;
  }

  ngOnInit() {
    this.getAllChats();
    this.initializeMessages();
    this.updateFilteredMessages();
    console.log(this.allChats);

  }



  getAllChats(){
    this.chatService.getAllChats().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allChats = res.result
      },
      error:(err)=>console.log(err)

    })
  }

  ngAfterViewInit() {
 /*    if (isPlatformBrowser(this.platformId)) {
      this.fileInput.nativeElement.addEventListener('change', (event) => this.onFileChange(event));
    } */
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
    const chatMessagesContainer = document.querySelector('.chat-messages');
    if (chatMessagesContainer) {
      const scrollAmount = direction === 'up' ? -50 : 50;
      chatMessagesContainer.scrollBy({
        top: scrollAmount,
        behavior: 'smooth'
      });
    }
  }

  handleSearchClick(index: number) {
    this.selectedMessageIndex = index;
    this.scrollToMessage(index);
  }

  scrollToMessage(index: number) {
    const messageElement = document.getElementById(`message-${index}`);
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }

  formatDay(date: Date): string {
    return date.toLocaleDateString(undefined, { weekday: 'long' });
  }
}
