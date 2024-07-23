import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:'',component:AppComponent},
<<<<<<< HEAD
  {path: 'user',loadChildren: () => import('../User/User.component').then(m => m.UserComponent)},
  {path: 'admin',loadChildren: () => import('../Admin/Admin.component').then(m => m.AdminComponent)},
  {path: 'action',loadChildren: () => import('../Action/Action.component').then(m => m.ActionComponent)},
  {path: 'items',loadChildren: () => import('../Items/Items.component').then(m => m.ItemsComponent)},
=======
  {path: 'user',loadChildren: () => import('../User/User.module').then(m => m.UserModule)},
  {path: 'admin',loadChildren: () => import('../Admin/Admin.module').then(m => m.AdminModule)},
  {path: 'action',loadChildren: () => import('../Action/Action.module').then(m => m.ActionModule)},
  {path: 'items',loadChildren: () => import('../Items/Items.module').then(m => m.ItemsModule)},
>>>>>>> bc991c456bc464477fcdb1886ef97f22c985eba7
  /* {path:'**',} ----  wild card  لسه معملنهاش   */

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
