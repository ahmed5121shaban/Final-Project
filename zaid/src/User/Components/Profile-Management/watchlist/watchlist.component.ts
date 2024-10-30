import { Component } from '@angular/core';
import { FavouriteService } from '../../../../Action/Services/favourite.service';
import { ToastrService } from 'ngx-toastr';

import { FavCategoryService } from '../../../../Shared/Services/fav/fav-category.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent {
  page:number=1;
  activefavAuctions:any[]=[];
  endedfavAuctions:any[]=[];
  upcomingfavAuctions:any[]=[];
  selectedAuctionId:any;
favCategories:any[]=[];
constructor(private favauctionservice:FavouriteService,private toaster:ToastrService, private favCatService:FavCategoryService){
this.getAtiveWishlist();
this.getEndedWishlist();
this.getUpcomingWishlist();
this.loadAllFavCat();

}
getAtiveWishlist(){
  this.favauctionservice.getAllActiveFavs().subscribe({
    next:(response)=>{
      console.log(response);
      
this.activefavAuctions=response;
    },
    error:(error)=>{
      console.log(error);
      
    }
  })
}
getEndedWishlist(){
  this.favauctionservice.getAllEndedFavs().subscribe({
    next:(response)=>{
      console.log(response);
      
this.endedfavAuctions=response;
    },
    error:(error)=>{
      console.log(error);
      
    }
  })
}
getUpcomingWishlist(){
  this.favauctionservice.getAllUpcomingFavs().subscribe({
    next:(response)=>{
      console.log(response);
      
this.upcomingfavAuctions=response;
    },
    error:(error)=>{
      console.log(error);
      
    }
  })
}
setSelectedAuctionId(auctionId:number){
  this.selectedAuctionId=auctionId;
}
remove(){
if(this.selectedAuctionId!=null){
  this.favauctionservice.removeFavAuction(this.selectedAuctionId).subscribe({
    next:(response)=>{
      this.toaster.success("Item deleted successfully")

console.log(response);
this.getAtiveWishlist();
this.getEndedWishlist();
this.getUpcomingWishlist();

this.activefavAuctions = this.activefavAuctions.filter(favAuction => favAuction.auctionID !== this.selectedAuctionId);
this.endedfavAuctions = this.endedfavAuctions.filter(favAuction => favAuction.auctionID !== this.selectedAuctionId);
this.upcomingfavAuctions = this.upcomingfavAuctions.filter(favAuction => favAuction.auctionID !== this.selectedAuctionId);

    },
    error:(error)=>{
      console.log(error);
      
    }
  })
}
}



deleteAll(){
  this.favauctionservice.deleteAllFav().subscribe({
    next:(response)=>{
      this.toaster.success("All favorites deleted successfully")

console.log(response);
this.activefavAuctions = this.activefavAuctions.filter(favAuction => favAuction.auctionID === 0);
this.endedfavAuctions = this.endedfavAuctions.filter(favAuction => favAuction.auctionID === 0);
this.upcomingfavAuctions = this.endedfavAuctions.filter(favAuction => favAuction.auctionID === 0);


    },
    error:(error)=>{
      console.log(error);
      
    }
  })
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
