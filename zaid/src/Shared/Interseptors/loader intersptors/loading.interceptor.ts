import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from '../loader intersptors/loader.service';
import { finalize } from 'rxjs/internal/operators/finalize';

export const LoaderInterceptor: HttpInterceptorFn = (req, next) => {
  const service = inject(LoaderService);

  service.show();

  return next(req).pipe(
    finalize(() => {
      service.hide();
    })
  );
}
