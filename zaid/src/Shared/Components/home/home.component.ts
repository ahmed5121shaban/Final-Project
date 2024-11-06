import { Component, inject, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from '../../../Admin/Services/category.service';
import { FavCategoryService } from '../../Services/fav/fav-category.service';
import { AuctionService } from '../../../Action/Services/auction.service';
import { FavouriteService } from '../../../Action/Services/favourite.service';
import { EventService } from '../../../Admin/Services/event.service';
import { AuthService } from '../../../User/Services/auth.service';
import { Router } from '@angular/router';
import { log } from 'console';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Event: any;
  reviews: any[] = [];
  isauctionFav: { [key: number]: boolean } = {};
  favAuctionIds: any[] = []
  mostBids = "mostBids";
  newArrival = "newArrivals";
  noBids = "noBids";
  endingsoon = "endingSoon";
  Categories: any[] = []
  favCategories: any[] = []
  isFavCat: { [key: number]: boolean } = {};
  popularAuctions: any[] = [];
  activeAuctions: any[] = [];
  newArrivals: any[] = [];
  endingSoon: any[] = [];
  Upcoming: any[] = [];
  nobids: any[] = [];
  auctionEndDate!: Date;
  countdown: string = '';
  private countdownInterval: any;
  constructor(private cookieService: CookieService, private categoryService: CategoryService, private FavcategoryService: FavCategoryService, private auctionService: AuctionService, private favauctionService: FavouriteService, private eventService: EventService, private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.getAllCategories();
    this.getPopularAuctions();
    this.getAllActiveAuctions();
    this.getNewArrivalse();
    this.updateFavState();
    this.getEndingSoon();
    this.getNoBids();
    this.getUpcoming();
    this.loadFavAuctions()
    this.getReviews();
    this.getAllFavCatIds();
    this.GetHomeEvent();

  }

  ngOnDestroy(): void {
    clearInterval(this.countdownInterval);
  }

  // handling fav categories


  getAllCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: res => {
        this.Categories = res.result;
        console.log("getAllCategories",this.Categories);
        this.UpdateCategoris();

      },
      error: err => {
        console.log("faild", err);
      }
    });
  }
  addToFav(categoryId: number) {
    if (this.authService.isLoggedIn) {
      this.FavcategoryService.AddToFav(categoryId).subscribe({
        next: res => {
          if (res.result == "added") {
            this.isFavCat[categoryId] = true;
          }
          if (res.result == "removed") {
            this.isFavCat[categoryId] = false;
          }
          console.log("addToFav",res.result);
        },
        error: err => {
          console.log("addtofaverror ", err);
        }
      })
    }
    else {
      const returnUrl = this.router.url;
      this.router.navigate(['/login'], { queryParams: { returnUrl } });
    }




  }

  getAllFavCatIds() {
    this.FavcategoryService.getFavCatIds().subscribe({
      next: res => {

        res.forEach((catId: any) =>
          this.isFavCat[catId] = true
        )
      },
      error: err => {
        console.log("errorr", err)
      }
    })
  }
  UpdateCategoris() {
    this.Categories.forEach(category =>
      this.isFavCat[category.id] = this.isFavCat[category.id] || false)

  }
  getPopularAuctions() {

    this.auctionService.getPopularAuctions().subscribe({
      next: (response) => {
        console.log(response);

        this.popularAuctions = response;
      },
      error: (err) => {
        console.log(err);

      },
    });




  }
  getAllActiveAuctions() {
    this.auctionService.HomeActive().subscribe({
      next: (response) => {
        console.log("HomeActive",response);
        this.activeAuctions = response;
        this.updateFavState();

      },
      error: (error) => {
        console.log(error);

      }
    })
  }

  getNewArrivalse() {
    this.auctionService.getNewArrivals().subscribe({
      next: (response) => {
        console.log(response);
        this.newArrivals = response;
        this.updateFavState();

      },
      error: (error) => {
        console.log(error);

      }
    })
  }
  // getEndingSoon() {
  //   this.auctionService.getEndingSoon().subscribe({
  //     next: (response) => {
  //       console.log("ending soon", response);
  //       this.endingSoon = response;
  //       this.auctionEndDate = new Date(response.endDate);
  //       console.log("ending date", this.auctionEndDate);
  //       this.startCountdown();
  //       this.updateFavState();

  //     },
  //     error: (error) => {
  //       console.log(error);

  //     }
  //   })
  // }
  getEndingSoon() {
    this.auctionService.getEndingSoon().subscribe({
      next: (response) => {
        console.log("Ending soon", response);
        this.endingSoon = response; // Store the array of auctions
  
        // Iterate through each auction to start countdowns
        this.endingSoon.forEach(auction => {
          const auctionEndDate = new Date(auction.endDate);
  
          // Check if the end date is valid
          if (!isNaN(auctionEndDate.getTime())) {
            console.log("Ending date for auction:", auctionEndDate);
            this.startCountdown(auctionEndDate); // Pass the auction end date to the countdown
          } else {
            console.error("Invalid end date for auction:", auction.endDate);
          }
        });
  
        this.updateFavState(); // Update the favorite state as needed
      },
      error: (error) => {
        console.error("Error fetching ending soon auctions:", error);
      }
    });
  }
  
  getNoBids() {
    this.auctionService.getNoBids().subscribe({
      next: (response) => {
        console.log(response);
        this.nobids = response;
        this.updateFavState();

      },
      error: (error) => {
        console.log(error);

      }
    })
  }
  getUpcoming() {
    this.auctionService.getUpcomingAuctions().subscribe({
      next: (response) => {
        console.log(response);
        this.Upcoming = response;
        this.updateFavState();

      },
      error: (error) => {
        console.log(error);

      }
    })
  }

  getReviews() {
    this.auctionService.getreviews().subscribe({
      next: (result) => {
        console.log(result);

        this.reviews = result;
      },
      error: (error) => {
        console.log(error);

      }
    })
  }

  GetHomeEvent() {
    this.eventService.GetHomeEvent().subscribe({
      next: (res: any) => {
        console.log(res);
        this.Event = res.result
      }, error: (er) => {
        console.log(er);
      }
    })
  }

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 300,
    navText: ['<i class="fa-solid fa-chevron-left text-dark"></i>',
      '<i class="fa-solid fa-chevron-right text-dark"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    slideBy: 5,
    nav: true
  }

  liveAction: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 300,
    navText: ['<',
      '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    slideBy: 5,
    nav: true
  }


  testimonialOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  categoryCarousel: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 300,
    navText: ['<i class="fa-solid fa-chevron-left text-dark"></i>',
      '<i class="fa-solid fa-chevron-right text-dark"></i>'],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      484: {
        items: 4
      },
      740: {
        items: 7
      },
      940: {
        items: 10
      }
    },
    slideBy: 5,
    nav: true
  }

  testimonialCarousel: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 300,
    navText: ['<',
      '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    slideBy: 5,
    nav: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    autoplaySpeed: 1000,
  }

  categoriesCarousel: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 300,
    navText: ['<',
      '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    slideBy: 5,
    nav: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    autoplaySpeed: 1000,
  }

  toNext(next: HTMLElement) {
    let next1 = next?.children
    next?.prepend(next1?.item(next1.length - 1) as HTMLElement)
  }

  toPrev(prev: HTMLElement) {
    let prev1 = prev?.children
    prev?.append(prev1.item(0) as HTMLElement)
  }

  addauctionToFav(id: number) {
    if (this.authService.isLoggedIn) {

      this.favauctionService.addAuctionToFav(id).subscribe({
        next: (response) => {
          if (response === "added") {
            console.log(response);
            this.isauctionFav[id] = true;
          }
          if (response === "remove")
            this.isauctionFav[id] = false;
        },
        error: (error) => {
          console.log(error)
        }
      });
    }
    else {
      const returnUrl = this.router.url;
      this.router.navigate(['/user/login'], { queryParams: { returnUrl } });
    }
  }

  loadFavAuctions() {
    this.favauctionService.getAllFavIds().subscribe({
      next: (response) => {
        //loop foreach auctionId in the fav list and mark it as favorite
        response.favAuctionIds.forEach((favauctionId: any) => {
          this.isauctionFav[favauctionId] = true;
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateFavState() {
    this.activeAuctions.forEach(auction => {
      this.isauctionFav[auction.id] = this.isauctionFav[auction.id] || false
    });
    this.popularAuctions.forEach(auction => {
      this.isauctionFav[auction.id] = this.isauctionFav[auction.id] || false
    });
    this.newArrivals.forEach(auction => {
      this.isauctionFav[auction.id] = this.isauctionFav[auction.id] || false
    });
    this.endingSoon.forEach(auction => {
      this.isauctionFav[auction.id] = this.isauctionFav[auction.id] || false
    });
    this.nobids.forEach(auction => {
      this.isauctionFav[auction.id] = this.isauctionFav[auction.id] || false
    });
    this.Upcoming.forEach(auction => {
      this.isauctionFav[auction.id] = this.isauctionFav[auction.id] || false
    });


  }
  // startCountdown() {
  //   this.countdownInterval = setInterval(() => {
  //     const now = new Date().getTime();
  //     const endTime = this.auctionEndDate.getTime();
  //     const timeLeft = endTime - now;

  //     if (timeLeft > 0) {
  //       const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  //       const hours = Math.floor(
  //         (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //       );
  //       const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  //       const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  //       if (days > 0) {
  //         this.countdown = `${days}d`;
  //       } else if (hours > 0) {
  //         this.countdown = `${hours}h ${minutes}m ${seconds}s`;
  //       } else if (minutes > 0) {
  //         this.countdown = `${minutes}m ${seconds}s`;
  //       } else {
  //         this.countdown = `${seconds}s`;
  //       }
  //     } else {
  //       this.countdown = 'Auction Ended';
  //       clearInterval(this.countdownInterval);
  //     }
  //   }, 1000);
  // }
  startCountdown(auctionEndDate: Date) {
    // Clear any existing countdown intervals to avoid overlaps
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  
    this.countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const endTime = auctionEndDate.getTime(); // Use the passed end date
      const timeLeft = endTime - now;
  
      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
        if (days > 0) {
          this.countdown = `${days}day`;
        } else if (hours > 0) {
          this.countdown = `${hours}h ${minutes}m ${seconds}s`;
        } else if (minutes > 0) {
          this.countdown = `${minutes}m ${seconds}s`;
        } else {
          this.countdown = `${seconds}s`;
        }
      } else {
        this.countdown = 'Auction Ended';
        clearInterval(this.countdownInterval); // Clear the interval when the countdown ends
      }
    }, 1000);
  }
  
}
