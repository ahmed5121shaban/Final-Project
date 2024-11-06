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
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css'],
})
export class AuctionListComponent implements OnInit {
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
  constructor(
    private auctionService: AuctionService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private favauctionService: FavouriteService,
    private authService: AuthService,
    private router: Router,
    private favcatService: FavCategoryService,
    private loader: LoaderService
  ) {
    this.loader.show();
    this.loadCategories().then(() => {
      this.route.params.subscribe((params) => {
        this.paramValue = params['category'] || '';

        // Check if paramValue matches any category name
        const matchingCategory = this.categories.find(
          (category) => category.name === this.paramValue
        );
        if (matchingCategory) {
          this.selectedCategory = matchingCategory;
          this.selectedCategoryname = matchingCategory.name;
          this.filterOption = ''; // Clear filter option if it's a category
        } else if (
          this.paramValue === 'mostBids' ||
          this.paramValue === 'newArrivals' ||
          this.paramValue === 'noBids' ||
          this.paramValue === 'endingSoon'
        ) {
          // Handle specific filter options
          this.filterOption = this.paramValue;
          this.selectedCategory = '';
        } else {
          // If paramValue is neither a category nor a filter option, treat it as search text
          this.searchtxt = this.paramValue;
          this.selectedCategory = '';
          this.filterOption = '';
        }


        this.loadActiveAuctions();
      });
    });
  }

  ngOnInit(): void {}
  toggleSortOrder(): void {
    this.isAscending = !this.isAscending;
    this.loadActiveAuctions();
  }

  // Handle sort option changes
  updateSortOption(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.filterOption = selectElement.value;
    this.loadActiveAuctions();
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
        this.loadFavAuctions();
this.getFavCatIds()
          this.updateFavState();
          console.log(this.activeAuctions);
        },
        error: (err) => {
          console.error('Error fetching active auctions', err);
        },
      });
  }

  loadCategories(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.categoryService.getCategories().subscribe({
        next: (data) => {
          this.categories = data.result;
          this.UpdateCategoris();

          resolve(); // Notify that categories have been loaded
        },
        error: (err) => {
          console.error('Error fetching categories', err);
          resolve(); // Even in case of error, resolve the promise to continue
        },
      });
    });
  }

  onCategorySelect(category: string): void {
    this.selectedCategoryname = category;

    this.pageActive = 1;
    this.searchtxt = this.selectedCategory;
    this.loadCategories();
    this.loadActiveAuctions();
  }

  totalPagesActive(): number {
    return Math.ceil(this.totalItemsActive / this.itemsPerPage);
  }

  onActivePageChange(newPageActive: number): void {
    console.log('Active Page changed to:', newPageActive);
    if (newPageActive > 0 && newPageActive <= this.totalPagesActive()) {
      this.pageActive = newPageActive;
      this.loadActiveAuctions();
    }
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

  loadFavAuctions() {
    this.favauctionService.getAllFavIds().subscribe({
      next: (response) => {
        //loop foreach auctionId in the fav list and mark it as favorite
        response.favAuctionIds.forEach((favauctionId: any) => {
          this.isFav[favauctionId] = true;
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateFavState() {
    this.activeAuctions.forEach((auction) => {
      this.isFav[auction.id] = this.isFav[auction.id] || false;
    });
  }

  // handel fav categories
  getFavCatIds(): void {
    this.favcatService.getFavCatIds().subscribe({
      next: (data) => {
        // data=data.filter(data==this.categorysearch.id);
        // if(data.length>0){
        //   this.categorysearch[0].isFavCat[this.categorysearch.id]=true;
        // }
        data.forEach((cat: any) => (this.isFavCat[cat] = true));
        console.log(data);
      },
      error: (err) => {
        console.log('my error is :', err);
      },
    });
  }
  UpdateCategoris() {
    this.categories.forEach(
      (category) =>
        (this.isFavCat[category.id] = this.isFavCat[category.id] || false)
    );
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
  clearSearch() {
    this.searchtxt = '';
    this.router.navigate(['../action/auction-list', this.searchtxt]);
  }
}
