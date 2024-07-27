import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: 'user', loadChildren: () => import('../User/User.component').then(m => m.UserComponent) },
  { path: 'admin', loadChildren: () => import('../Admin/Admin.component').then(m => m.AdminComponent) },
  { path: 'action', loadChildren: () => import('../Action/Action.component').then(m => m.ActionComponent) },
  { path: 'items', loadChildren: () => import('../Items/Items.component').then(m => m.ItemsComponent) },
  /* {path:'**',} ----  wild card  لسه معملنهاش   */

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
