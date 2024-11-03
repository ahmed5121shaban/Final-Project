import { Component, OnInit } from '@angular/core';
import { FavouriteService } from '../../Services/favourite.service';
import { AuthService } from '../../../User/Services/auth.service';
import { EventService } from '../../../Admin/Services/event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css'],
})
export class EventsListComponent implements OnInit {
  returnUrl: string = '/';
  isFav: { [key: number]: boolean } = {};
  activeAuctions: any[] = [];
  categories: any[] = [];
  isFavCat: { [key: number]: boolean } = {};
  favCatIds: any[] = [];
  paramValue: string = '';

  favAuctionIds: any[] = [];
  // Pagination properties
  pageActive: number = 1;
  itemsPerPage: number = 6;
  totalItemsActive: number = 0;
  // Filter properties
  searchtxt: string = '';
  selectedCategory: any;
  selectedCategoryname: string = '';
  sortOption: string = 'Id';
  isAscending: boolean = false;
  filterOption: string = '';
  load = 4;
  eventId!: number;
  event: any;
  countdownInterval: any;
  countdown: string = '';
  constructor(
    private favauctionService: FavouriteService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService
  ) {
    this.route.params.subscribe((res) => {
      this.GetEventDetails(res['id']);
    });
  }
  ngOnInit(): void {}

  GetEventDetails(id: number) {
    this.eventService.GetEventDetails(id).subscribe({
      next: (res:any) => {
        this.event = res;
        this.startCountdown(new Date(res.endDate))
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToFav(id: number) {
    if (this.authService.isLoggedIn) {
      this.favauctionService.addAuctionToFav(id).subscribe({
        next: (response) => {
          if (response === 'added') {
            console.log(response);
            this.isFav[id] = true;
          }
          if (response === 'remove') this.isFav[id] = false;
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      const returnUrl = this.router.url;
      this.router.navigate(['/login'], { queryParams: { returnUrl } });
    }
  }

  updateFavState() {
    this.activeAuctions.forEach((auction) => {
      this.isFav[auction.id] = this.isFav[auction.id] || false;
    });
  }

  loadMore() {
    this.load += 4;
  }

  startCountdown(endDate:any) {
    this.countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const endTime = endDate.getTime(); // Use the Date object
      const timeLeft = endTime - now;

      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        if (days > 0) {
          this.countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else if (hours > 0) {
          this.countdown = `${hours}h ${minutes}m ${seconds}s`;
        } else if (minutes > 0) {
          this.countdown = `${minutes}m ${seconds}s`;
        } else {
          this.countdown = `${seconds}s`;
        }
      } else {
        this.countdown = 'Event Ended';
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }
}
