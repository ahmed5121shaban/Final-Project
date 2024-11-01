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
  Event:any[]=[];
  reviews:any[]=[];
  isauctionFav:{[key:number]:boolean}={};
  favAuctionIds:any[]=[]
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
  constructor(private cookieService: CookieService, private categoryService: CategoryService, private FavcategoryService: FavCategoryService, private auctionService: AuctionService,private favauctionService:FavouriteService,private eventService:EventService,private authService:AuthService,private router:Router) {

  }

  ngOnInit() {
    this.getPopularAuctions();
    this.getAllActiveAuctions();
    this.getNewArrivalse();

  }
  // handling fav categories


  getAllCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: res => {
        this.Categories = res.result;
        console.log(this.Categories);
        this.UpdateCategoris();

      },
      error: err => {
        console.log("faild", err);
      }
    });
  }



  addToFav(categoryId: number) {
    if(this.authService.isLoggedIn){
    this.FavcategoryService.AddToFav(categoryId).subscribe({
      next: res => {
        if (res.result == "added") {
          this.isFavCat[categoryId] = true;
        }
        if (res.result == "removed") {
          this.isFavCat[categoryId] = false;
        }
        console.log(res.result);
      },
      error: err => {
        console.log("addtofaverror ", err);
      }
    })
  }
  else{
    const returnUrl = this.router.url;
      this.router.navigate(['/user/login'], { queryParams: { returnUrl } });
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
    this.getAllCategories();
    this.auctionService.getPopularAuctions().subscribe({
      next: (response) => {
        console.log(response);

        this.popularAuctions = response;

        this.updateFavState();
        this.getEndingSoon();
        this.getNoBids();
        this.getUpcoming();
        this.loadFavAuctions()
        this.getReviews();
        this.getAllFavCatIds();
      },
      error: (err) => {
        console.log(err);

      },
    });




  }
  getAllActiveAuctions() {
    this.auctionService.getAllActive().subscribe({
      next: (response) => {
        console.log(response);
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
  getEndingSoon() {
    this.auctionService.getEndingSoon().subscribe({
      next: (response) => {
        console.log(response);
        this.endingSoon = response;
        this.updateFavState();

      },
      error: (error) => {
        console.log(error);

      }
    })
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

getEvent(){
  this.eventService.GetAllEvent().subscribe({
    next:(res:any)=>{
     this.Event= res.result;
      console.log(this.Event);

    },
    error:(err)=>{
      console.log(err);
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

  addauctionToFav(id:number){
    if(this.authService.isLoggedIn){

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
  else{
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

}
