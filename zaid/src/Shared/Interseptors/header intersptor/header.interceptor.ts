import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../../User/Services/auth.service';
import { CookieService } from 'ngx-cookie-service';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  let isLoggedIn = inject(AuthService)
  let cookieService= inject(CookieService)
  const token= cookieService.get("token")
  if(token)
    isLoggedIn.isLoggedUserSubject.next(true)
  const headers = req.headers.set('Authorization', `Bearer ${token}`);
  const authReq = req.clone({ headers });

  return next(authReq);

};
