import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  const token= localStorage.getItem("token")
  const headers = req.headers.set('Authorization', `Bearer ${token}`);
  const authReq = req.clone({ headers });

  return next(authReq);
};
