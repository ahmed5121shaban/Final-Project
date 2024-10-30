import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../Services/api.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  User :any;

  constructor(private userserv:ApiService) { }

  ngOnInit() {
  this.getUserData();
    
  }
  getUserData():void{
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

}
