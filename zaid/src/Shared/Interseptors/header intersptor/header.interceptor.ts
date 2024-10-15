import { HttpInterceptorFn } from '@angular/common/http';
import { Inject, inject } from '@angular/core';
import { AuthService } from '../../../User/Services/auth.service';
import { CookieService } from 'ngx-cookie-service';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  let cookieService= inject(CookieService)
  
  const token= cookieService.get("token")
  console.log("in interceptor token: ",token);
  
  if(token){
    
    const headers = req.headers.set('Authorization', `Bearer ${token}`);
    const authReq = req.clone({ headers });
    
    return next(authReq);
  }
  return next(req);
};
