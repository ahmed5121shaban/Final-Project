import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../../User/Services/auth.service';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let isLoggedIn = inject(AuthService)
  const token= localStorage.getItem("token")
  if(token)
    isLoggedIn.isloggedUserSubject.next(true);
  const headers = req.headers.set('Authorization', `Bearer ${token}`);
  const authReq = req.clone({ headers });

  return next(authReq);
};
