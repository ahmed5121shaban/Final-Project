import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';
import { LoaderService } from '../loader intersptors/loader.service';

export const LoaderInterceptor: HttpInterceptorFn = (req, next) => {

  let service = inject(LoaderService)


  service.show();

  return next(req).pipe(
    finalize(() => {
      service.hide();
    })
  );

}
