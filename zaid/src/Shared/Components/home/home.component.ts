import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items:any[]

  constructor() {

    this.items=[{
      title:'Classic Car Auction 1',
      text1:'August 15, 2024',
      text2:'$10,000',
      image:'https://picsum.photos/400/400'
    },
    {
      title:'Classic Car Auction 2',
      text1:'August 15, 2024',
      text2:'$10,000',
      image:'https://picsum.photos/401/401'
    },
    {
      title:'Classic Car Auction 3',
      text1:'August 15, 2024',
      text2:'$10,000',
      image:'https://picsum.photos/402/402'
    },
    {
      title:'Classic Car Auction 4',
      text1:'August 15, 2024',
      text2:'$10,000',
      image:'https://picsum.photos/403/403'
    },
    {
      title:'Classic Car Auction 5',
      text1:'August 15, 2024',
      text2:'$10,000',
      image:'https://picsum.photos/404/404'
    },
    {
      title:'Classic Car Auction 6',
      text1:'August 15, 2024',
      text2:'$10,000',
      image:'https://picsum.photos/405/405'
    },
    {
      title:'Classic Car Auction 7',
      text1:'August 15, 2024',
      text2:'$10,000',
      image:'https://picsum.photos/406/406'
    },
    {
      title:'Classic Car Auction 8',
      text1:'August 15, 2024',
      text2:'$10,000',
      image:'https://picsum.photos/407/407'
    }]

  }

  ngOnInit() {}


  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<img src="previous-filled-svgrepo-com.svg" width="45px">',
              '<img src="next-filled-svgrepo-com.svg" width="50px">'],
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
        items: 3
      }
    },
    nav: true
  }

  liveAction: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<img src="previous-filled-svgrepo-com.svg" width="45px">',
              '<img src="next-filled-svgrepo-com.svg" width="50px">'],
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
    navSpeed: 700,
    navText: ['<img src="previous-filled-svgrepo-com.svg" width="45px">',
              '<img src="next-filled-svgrepo-com.svg" width="50px">'],
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 5
      },
      740: {
        items: 9
      },
      940: {
        items: 14
      }
    },
    nav: true
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
