import { HttpInterceptorFn } from '@angular/common/http';
import { Inject, inject } from '@angular/core';
import { AuthService } from '../../../User/Services/auth.service';
import { DOCUMENT } from '@angular/common';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let isLoggedIn = inject(AuthService)
  let document = inject( DOCUMENT)
  const localStorage = document.defaultView?.localStorage;
 if (localStorage) {
    
    const token= localStorage.getItem("token")
    //if(token)
      //isLoggedIn.isLoggedUserSubject.next(true)
    const headers = req.headers.set('Authorization', `Bearer ${token}`);
    const authReq = req.clone({ headers });
    return next(authReq);
  } else {
    return next(req);
  }

};
