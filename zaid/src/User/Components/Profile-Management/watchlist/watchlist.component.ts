import { Component } from '@angular/core';
import { FavouriteService } from '../../../../Action/Services/favourite.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent {
  activefavAuctions:any[]=[];
  endedfavAuctions:any[]=[];
  selectedAuctionId:any;
constructor(private favauctionservice:FavouriteService,private toaster:ToastrService){
this.getAtiveWishlist();
this.getEndedWishlist();

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
setSelectedAuctionId(auctionId:number){
  this.selectedAuctionId=auctionId;
}
remove(){
if(this.selectedAuctionId!=null){
  this.favauctionservice.removeFavAuction(this.selectedAuctionId).subscribe({
    next:(response)=>{
      this.toaster.success("Item deleted successfully")

console.log(response);
this.activefavAuctions = this.activefavAuctions.filter(favAuction => favAuction.auctionID !== this.selectedAuctionId);
this.endedfavAuctions = this.endedfavAuctions.filter(favAuction => favAuction.auctionID !== this.selectedAuctionId);

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


    },
    error:(error)=>{
      console.log(error);
      
    }
  })
}
}
