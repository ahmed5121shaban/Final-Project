import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from '../loader intersptors/loader.service';
import { finalize } from 'rxjs/operators';

export const LoaderInterceptor: HttpInterceptorFn = (req, next) => {
  const service = inject(LoaderService);

  console.log("the loader start hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
  service.show();

  return next(req).pipe(
    finalize(() => {
      console.log("the loader ended hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
      service.hide();
    })
  );
}
