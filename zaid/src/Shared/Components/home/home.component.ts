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
      image:'https://via.placeholder.com/400x300'
    },
    {
      title:'Classic Car Auction 2',
      text1:'August 15, 2024',
      text2:'$10,000',
      image:'https://via.placeholder.com/400x300'
    },
    {
      title:'Classic Car Auction 3',
      text1:'August 15, 2024',
      text2:'$10,000',
      image:'https://via.placeholder.com/400x300'
    },
    {
      title:'Classic Car Auction 4',
      text1:'August 15, 2024',
      text2:'$10,000',
      image:'https://via.placeholder.com/400x300'
    },
    {
      title:'Classic Car Auction 5',
      text1:'August 15, 2024',
      text2:'$10,000',
      image:'https://via.placeholder.com/400x300'
    },
    {
      title:'Classic Car Auction 6',
      text1:'August 15, 2024',
      text2:'$10,000',
      image:'https://via.placeholder.com/400x300'
    },
    {
      title:'Classic Car Auction 7',
      text1:'August 15, 2024',
      text2:'$10,000',
      image:'https://via.placeholder.com/400x300'
    },
    {
      title:'Classic Car Auction 8',
      text1:'August 15, 2024',
      text2:'$10,000',
      image:'https://via.placeholder.com/400x300'
    }]

  }

  ngOnInit() {
    //setInterval(()=>{

    //},3000)
  }


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
        items: 3
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
    navText: ['',
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
        items: 15
      }
    },
    nav: true
  }
  toNext(next:HTMLElement){
    let next1 = next?.children
    next?.prepend(next1?.item(next1.length - 1) as HTMLElement)

               /*  let allChild = next.parentElement?.firstChild?.lastChild
              let child = allChild?.childNodes
              allChild?.replaceChild(child?.item(0) as ChildNode,child?.item(this.items.length -1) as ChildNode )
              console.log(child) */
              //let allChild = next.parentElement?.firstElementChild?.lastElementChild;
  }

  toPrev(prev:HTMLElement){
    let prev1 = prev?.children
    prev?.append(prev1.item(0) as HTMLElement)

               //let allChild = prev.parentElement?.firstElementChild?.lastElementChild
  }

}
