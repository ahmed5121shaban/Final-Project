import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  constructor(private cookieService: CookieService,private toaster:ToastrService) {


  }
  logUot(){
    this.cookieService.delete("token");
    this.cookieService.delete("auth");
    this.toaster.success("you LogedUot now");
  }
}
