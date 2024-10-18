import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from '../../../Admin/Services/category.service';
import { FavCategoryService } from '../../Services/fav/fav-category.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items:any[]
  Categories:any[]=[]
  favCategories:any[]=[]
  isFav: { [key: number]: boolean } = {};
  

  constructor(private cookieService:CookieService,private categoryService:CategoryService,private FavcategoryService:FavCategoryService) {

    this.items=[{
      title:'Classic Car Auction 1',
      text1:'August 15, 2024',
      text2:'$10,000',

      image:'https://picsum.photos/501/500'

    },
    {
      title:'Classic Car Auction 2',
      text1:'August 15, 2024',
      text2:'$10,000',

      image:'https://picsum.photos/510/500'

    },
    {
      title:'Classic Car Auction 3',
      text1:'August 15, 2024',
      text2:'$10,000',
      image:'https://picsum.photos/520/510'
    },
    {
      title:'Classic Car Auction 4',
      text1:'August 15, 2024',
      text2:'$10,000',
      image:'https://picsum.photos/510/501'
    },
    {
      title:'Classic Car Auction 5',
      text1:'August 15, 2024',
      text2:'$10,000',
      image:'https://picsum.photos/500/502'
    },
    {
      title:'Classic Car Auction 6',
      text1:'August 15, 2024',
      text2:'$10,000',
      image:'https://picsum.photos/520/500'
    },
    {
      title:'Classic Car Auction 7',
      text1:'August 15, 2024',
      text2:'$10,000',
      image:'https://picsum.photos/502/500'
    },
    {
      title:'Classic Car Auction 8',
      text1:'August 15, 2024',
      text2:'$10,000',
      image:'https://picsum.photos/500/520'
    }]

  }

  ngOnInit() {
  this.getAllFavCatIds();
  this.getAllCategories();

  }

  getAllCategories():void{
    this.categoryService.getCategories().subscribe({
      next: res=>{
        this.Categories=res.result;
        console.log(this.Categories);
        this.UpdateCategoris();
        
      },
      error:err=>{
        console.log("faild",err);  
      }
    });
  }
  addToFav(categoryId:number){
this.FavcategoryService.AddToFav(categoryId).subscribe({
  next:res=>{
    if(res.result =="added"){
      this.isFav[categoryId]=true;
    }
    if(res.result=="removed"){
      this.isFav[categoryId]=false;
    }
  console.log(res.result); 
  },
  error:err=>{
    console.log("addtofaverror ",err); 
  }
})
  
  


  }
  getAllFavCatIds(){
    this.FavcategoryService.getFavCatIds().subscribe({
      next:res=>{
      
        res.forEach((catId:any)=>
          this.isFav[catId]=true 
        )
      },
      error:err=>{
        console.log("errorr",err)
      }
    })
  }
  UpdateCategoris(){
    this.Categories.forEach(category=>
      this.isFav[category.id]=this.isFav[category.id]||false
    )
  }



  customOptions: OwlOptions = {
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
    slideBy:5,
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
    slideBy:5,
    nav: true
  }


  testimonialOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['',''],
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
    navText: ['<',
              '>'],
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

  toNext(next:HTMLElement){
    let next1 = next?.children
    next?.prepend(next1?.item(next1.length - 1) as HTMLElement)
  }

  toPrev(prev:HTMLElement){
    let prev1 = prev?.children
    prev?.append(prev1.item(0) as HTMLElement)
  }


}