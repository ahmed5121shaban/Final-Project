import { Component } from '@angular/core';
import { CategoryService } from '../../Services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
page:number=1;
  Categories:any[]=[];
constructor(private categoryService:CategoryService){
  this.getAllCategories();

}

getAllCategories(): void {
  this.categoryService.getCategories().subscribe({
    next: res => {
      this.Categories = res.result;
      console.log(this.Categories);

    },
    error: err => {
      console.log("faild", err);
    }
  });
}


}
