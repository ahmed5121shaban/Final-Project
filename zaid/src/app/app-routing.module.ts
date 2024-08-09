import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:"full"},
  {path: 'home',loadChildren: () => import('../Shared/Shared.module').then(m => m.SharedModule)},
  {path: 'user',loadChildren: () => import('../User/User.module').then(m => m.UserModule)},
  {path: 'admin',loadChildren: () => import('../Admin/Admin.module').then(m => m.AdminModule)},
  {path: 'action',loadChildren: () => import('../Action/Action.module').then(m => m.ActionModule)},
  {path: 'items',loadChildren: () => import('../Items/Items.module').then(m => m.ItemsModule)},
  /* {path:'**',} ----  wild card  لسه معملنهاش   */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
