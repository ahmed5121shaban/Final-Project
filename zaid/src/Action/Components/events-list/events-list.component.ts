import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionService } from '../../Services/auction.service';
import { CategoryService } from '../../../Admin/Services/category.service';
import { Pagination } from '../../Models/models/pagination.model';

import { FavouriteService } from '../../Services/favourite.service';
import { AuthService } from '../../../User/Services/auth.service';
import { Console, log } from 'console';
import { FavCategoryService } from '../../../Shared/Services/fav/fav-category.service';
import { LoaderService } from '../../../Shared/Interseptors/loader intersptors/loader.service';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
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
  constructor(
    private auctionService: AuctionService,
    private favauctionService: FavouriteService,
    private authService: AuthService,
    private router: Router,
    private favcatService: FavCategoryService,
    private loader: LoaderService
  ) {
    this.loader.show();
    this.loadActiveAuctions();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  loadActiveAuctions(): void {
    this.auctionService
      .getPaginatedAuctions(
        this.searchtxt,
        this.sortOption,
        this.isAscending,
        this.itemsPerPage,
        this.pageActive,
        this.selectedCategoryname,
        this.filterOption
      )
      .pipe(
        finalize(() => {
          this.loader.hide();
        })
      )
      .subscribe({
        next: (pagination: Pagination<any[]>) => {
          this.activeAuctions = pagination.list || [];
          this.totalItemsActive = pagination.totalCount || 0;
          this.updateFavState();
          console.log(this.activeAuctions);
        },
        error: (err) => {
          console.error('Error fetching active auctions', err);
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

  addCatToFav(id: number) {
    if (this.authService.isLoggedIn) {
      this.favcatService.AddToFav(id).subscribe({
        next: (res) => {
          if (res.result == 'added') {
            this.isFavCat[id] = true;
          }
          if (res.result == 'removed') {
            this.isFavCat[id] = false;
          }
        },
        error: (err) => {
          console.log('my err is :', err);
        },
      });
    } else {
      const returnUrl = this.router.url;
      this.router.navigate(['/login'], { queryParams: { returnUrl } });
    }
  }

  loadMore(){
    this.load += 4;
  }

}
