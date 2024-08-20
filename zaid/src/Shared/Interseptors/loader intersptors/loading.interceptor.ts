import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoaderService } from '../loader intersptors/loader.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // إظهار الـ loader عند بدء الطلب
    this.loadingService.show();

    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        (error: any) => {
          // إخفاء الـ loader إذا كان هناك خطأ
          this.loadingService.hide();
        },
        () => {
          // إخفاء الـ loader عند انتهاء الطلب بنجاح
          this.loadingService.hide();
        }
      )
    );
  }
}
