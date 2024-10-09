import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../../User/Services/auth.service';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem("token")
  console.log("tooken",token);
  
  if (token) {
    const headers = req.headers.set('Authorization', `Bearer ${token}`);
    const authReq = req.clone({ headers });
    console.log("auth", authReq);
    
    return next(authReq);
  }
  return next(req);
};
