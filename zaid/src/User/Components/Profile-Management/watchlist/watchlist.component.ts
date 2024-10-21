import { Component, OnInit } from '@angular/core';
import { FavCategoryService } from '../../../../Shared/Services/fav/fav-category.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent implements OnInit {

favCategories:any[]=[];

constructor(private cookieservice:CookieService, private favCatService:FavCategoryService){}

ngOnInit(): void {
  this.loadAllFavCat();
}

loadAllFavCat():void{
  this.favCatService.getFavCat().subscribe({
    next:data=>{
      console.log(data);
      this.favCategories =data;
    },
    error:err=>{
      console.log("my error is :",err);
      
    }
  });
}
removecategory(categoryId:number):void{
this.favCatService.AddToFav(categoryId).subscribe({
  next:data=>{
    console.log(data.result);
    
    if(data.result=="removed"){
      this.favCategories=this.favCategories.filter(category=>category.Id != categoryId );
    }
  },
  error:err=>{
    console.log("my error is :",err);
    
  }
})
}

}
