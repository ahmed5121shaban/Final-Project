import { Component, ChangeDetectorRef } from '@angular/core';
import { LoaderService } from '../Shared/Interseptors/loader intersptors/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zaid';
  isloading: boolean = false;

  constructor(private loaderService: LoaderService, private cdr: ChangeDetectorRef) {
    this.loaderService.loading$.subscribe((loading) => {
      setTimeout(() => {
        this.isloading = loading;
        this.cdr.detectChanges(); // تحديث العرض
      });
    });
  }
}
