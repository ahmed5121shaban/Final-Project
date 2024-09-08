import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../Shared/Components/not-found/not-found.component';
import { DashboardLayoutComponent } from '../Admin/Components/dashboard-layout/dashboard-layout.component';
import { UserLayoutComponent } from '../Shared/Components/user-layout/user-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',component:UserLayoutComponent,
    loadChildren: () =>
      import('../Shared/Shared.module').then((m) => m.SharedModule),
  },
  {
    path: 'user',component:UserLayoutComponent,
    loadChildren: () => import('../User/User.module').then((m) => m.UserModule),
  },
  {
    path: 'admin',
    component: DashboardLayoutComponent,
    loadChildren: () =>
      import('../Admin/Admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'action',component:UserLayoutComponent,
    loadChildren: () =>
      import('../Action/Action.module').then((m) => m.ActionModule),
  },
  {
    path: 'items',component:UserLayoutComponent,
    loadChildren: () =>
      import('../Items/Items.module').then((m) => m.ItemsModule),
  },
  {
    path: 'shared',component:UserLayoutComponent,
    loadChildren: () =>
      import('../Shared/Shared.module').then((m) => m.SharedModule),
  },
  { path: '**', component: NotFoundComponent },
  /* {path:'**',} ----  wild card  لسه معملنهاش   */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
