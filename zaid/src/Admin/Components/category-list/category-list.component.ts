import { Component } from '@angular/core';
import { CategoryService } from '../../Services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
page:number=1;
  Categories:any[]=[];
  searchtxt:string='';
constructor(private categoryService:CategoryService,private toaster:ToastrService){
  if(this.searchtxt=='')
  this.getAllCategories();

}

getFilteredCategories(): void {
  this.categoryService.getCategoriesfilter(this.searchtxt).subscribe({
    next: res => {
      this.Categories = res.result.list;
      console.log(this.Categories);

    },
    error: err => {
      console.log("faild", err);
    }
  });
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

onSearch() {
 this.getFilteredCategories();

}
clearSearch(){
  this.searchtxt="";
  this.getAllCategories();
}

delete(id:number){
this.categoryService.deleteCategory(id).subscribe({
  next:(response)=>{
console.log(response.res);
this.toaster.success("category deleted successfully");
this.getAllCategories();
  },
  error:(error)=>{
console.log(error);

  }
})

}
}
