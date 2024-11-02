import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { json } from 'stream/consumers';

export const sellerRoleGuard: CanActivateFn = (route, state) => {
  let token = inject(CookieService).get("token");
  let toaster = inject(ToastrService);
  let router = inject(Router)
  if(!token){
    router.navigate(['/login'])
    toaster.warning("login first")
    return false;
  }
  let role = JSON.parse(atob(token.split('.')[1]));
  if(role['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes('Seller'))
    return true;
  router.navigate(['/login'])
  toaster.warning("login first")
  return false;
};
