import { Component } from '@angular/core';
import { LoaderService } from '../Shared/Interseptors/loader intersptors/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'zaid';
  isloading:boolean=false;
  constructor(private  loaderService:LoaderService) {
    this.loaderService.loading$.subscribe((loading)=>{
      this.isloading=loading
    })
  }

}
