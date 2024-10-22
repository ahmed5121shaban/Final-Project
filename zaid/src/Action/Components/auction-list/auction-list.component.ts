import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../../Services/auction.service';
import { CategoryService } from '../../../Admin/Services/category.service';
import { Pagination } from '../../Models/models/pagination.model';

import { FavouriteService } from '../../Services/favourite.service';
import { Console, log } from 'console';
import { FavCategoryService } from '../../../Shared/Services/fav/fav-category.service';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {

  isFav:{[key:number]:boolean}={};
  activeAuctions: any[] = [];
  categories: any[] = [];
  categorysearch:any={};
  isFavCat:{[key:number]:boolean}={};
  favCatIds:any[]=[];
  

  favAuctionIds:any[]=[]
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
    private favauctionService:FavouriteService,
    private favcatService:FavCategoryService
  ) {}


  



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedCategory = params['category'] || '';
      if(this.selectedCategory==="mostBids"){
        this.filterOption="mostBids";
        this.selectedCategory="";
        this.loadActiveAuctions();

      }
      
      if(this.selectedCategory==="newArrivals"){
        this.filterOption="newArrivals";
        this.selectedCategory="";
        this.loadActiveAuctions();

      }
      if(this.selectedCategory==="noBids"){
        this.filterOption="noBids";
        this.selectedCategory="";
        this.loadActiveAuctions();

      }
      if(this.selectedCategory==="endingSoon"){
        this.filterOption="EndDate";
        this.selectedCategory="";
        this.loadActiveAuctions();

      }
      else{
      this.loadActiveAuctions();
      }
      this.getFavCatIds();
      this.loadCategories();
      this.loadFavAuctions();
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
          this.updateFavState();
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


  addToFav(id:number){
this.favauctionService.addAuctionToFav(id).subscribe({
  next:(response)=>{
if(response==="added"){
    console.log(response);
this.isFav[id]=true;}
if(response==="remove")
  this.isFav[id]=false;
    
  },
  error:(error)=>{
    console.log(error)

  }
});


}

loadFavAuctions(){
  this.favauctionService.getAllFavIds().subscribe({
next:(response) =>{
  //loop foreach auctionId in the fav list and mark it as favorite
  response.favAuctionIds.forEach((favauctionId: any)=>{
this.isFav[favauctionId]=true;
  });
},
error:(error) =>{
  console.log(error); 
},
});
}

updateFavState(){
  this.activeAuctions.forEach(auction=>{
    this.isFav[auction.id]=this.isFav[auction.id]|| false
  });
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
