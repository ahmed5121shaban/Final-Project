import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../../Services/auction.service';
import { CategoryService } from '../../../Admin/Services/category.service';
import { Pagination } from '../../Models/models/pagination.model';
import { Console, log } from 'console';
import { FavCategoryService } from '../../../Shared/Services/fav/fav-category.service';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {
  activeAuctions: any[] = [];
  categories: any[] = [];
  categorysearch:any={};
  isFavCat:{[key:number]:boolean}={};
  favCatIds:any[]=[];
  

  // Pagination properties
  pageActive: number = 1; 
  itemsPerPage: number = 6; 
  totalItemsActive: number = 0;
    // Filter properties
  searchtxt: string = '';
  selectedCategory: string = ''; 
  sortOption: string = 'Id'; 
  isAscending: boolean = false;
  filterOption: string =''; 

  constructor(
    private auctionService: AuctionService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private favcatService:FavCategoryService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedCategory = params['category'] || '';
      this.loadActiveAuctions();
      this.getFavCatIds();
      this.loadCategories();
     
    
      
    });
  }

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
      this.auctionService.getPaginatedAuctions(
        this.searchtxt,
        this.sortOption,     
        this.isAscending,     
        this.itemsPerPage,
        this.pageActive,
        this.selectedCategory,
       this.filterOption
      ).subscribe({
        next: (pagination: Pagination<any[]>) => {
          this.activeAuctions = pagination.list || [];
          this.totalItemsActive = pagination.totalCount || 0;
          console.log(this.activeAuctions);
        },
        error: (err) => {
          console.error('Error fetching active auctions', err);
        }
      });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.result;
        this.UpdateCategoris();
        this.categorysearch=this.categories.filter(category=>category.name==this.selectedCategory);

      },
      error: (err) => {
        console.error('Error fetching categories', err);
      }
    });
  }

  onCategorySelect(category: string): void {
    this.selectedCategory = category;
    this.pageActive = 1;
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

 // handel fav categories 
  getFavCatIds():void{
    this.favcatService.getFavCatIds().subscribe({
      next:data=>{
        // data=data.filter(data==this.categorysearch.id);
        // if(data.length>0){
        //   this.categorysearch[0].isFavCat[this.categorysearch.id]=true;
        // }
        data.forEach((cat:any) => this.isFavCat[cat]=true); 
        console.log(data);
        
      },
      error:err=>{
        console.log("my error is :",err);
      }
    })
  }
  UpdateCategoris(){
    this.categories.forEach(category=>
      this.isFavCat[category.id]=this.isFavCat[category.id]||false
    )
  }
  addCatToFav(id:number){
    this.favcatService.AddToFav(id).subscribe({
      next:res=>{
        if(res.result == "added"){
          this.categorysearch[0].isFavCat[id]=true ;
        }
        if(res.result == "removed"){
          this.categorysearch[0].isFavCat[id]=false;
        }
      },
      error:err=>{
        console.log("my err is :",err);
        
      }

    })
  }

}
