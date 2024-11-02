import { Component } from '@angular/core';
import { AuthService } from '../../../User/Services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from '../../../User/Services/api.service';


@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

User:any ;
  constructor(private authService:AuthService,
              private cookieService:CookieService,
              private toaster:ToastrService,
              private router: Router,
              private userserv:ApiService,

){
  this.userserv.getUserData().subscribe({
    next:(data)=>{
      console.log(data);
      data.name = data.name.split(' ')[0];
      this.User=data;

    },
    error:(err)=>{
      console.log(err);

    }
  })
}


  logOut() {
    debugger
    this.authService.logout()

  }
}

