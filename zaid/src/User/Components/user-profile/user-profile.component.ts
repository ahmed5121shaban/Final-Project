import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from '../../Services/api.service';
import { ActivatedRoute } from '@angular/router';
import { __param } from 'tslib';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

 Profile: any = {};
  userId :string = "";
  stars :number[]=[1,2,3,4,5];

  constructor(private cookieService: CookieService,
    private AccountService: ApiService,private route:ActivatedRoute) { }

  ngOnInit(): void {
  this.route.params.subscribe(Params=>{
  this.userId = Params['id'];
  this.getUserProfile(this.userId);

  });

  }
  getUserProfile(id: string) {
    this.AccountService.getUserProfile(id).subscribe({
      next: res => {
        console.log(res);
        this.Profile=res;   
      },
      error:err=>{
        console.log("error",err);
        
      }
    })
  }


  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 300,
    navText: ['<i class="fa-solid fa-chevron-left text-dark"></i>',
      '<i class="fa-solid fa-chevron-right text-dark"></i>'],
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
    slideBy: 5,
    nav: true
  }
}