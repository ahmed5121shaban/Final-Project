import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-Profile-Management',
  templateUrl: './Profile-Management.component.html',
  styleUrls: ['./Profile-Management.component.css']
})
export class ProfileManagementComponent implements OnInit {
  role :string="";
  constructor(  private authService:AuthService,
    
  ) { }

  ngOnInit() {
    this.getUserRole();
  }
  getUserRole():void{
    this.authService.roleSubject.subscribe({
      next:(roles)=>{
        console.log("userroles",roles);
        this.role = roles.find(role=>role==="Seller") || "";
        console.log("isSeller?",this.role);
        
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }
}
