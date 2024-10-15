import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from '../loader intersptors/loader.service';
import { finalize } from 'rxjs/operators';

export const LoaderInterceptor: HttpInterceptorFn = (req, next) => {
  const service = inject(LoaderService);

  // عرض اللودر قبل إرسال الطلب
  service.show();

  return next(req).pipe(
    finalize(() => {
      // إخفاء اللودر بعد انتهاء الطلب
      service.hide();
    })
  );
}
