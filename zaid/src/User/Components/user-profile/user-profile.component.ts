import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

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

}
