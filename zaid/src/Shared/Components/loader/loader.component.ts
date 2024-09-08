
import { Component } from '@angular/core';
import { LoaderService } from '../../Interseptors/loader intersptors/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  isLoading: boolean;

  constructor(private loaderService: LoaderService) {
    this.isLoading = false; 
    this.loaderService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }
 
}
