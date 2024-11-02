import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../User/Services/auth.service';
import { of } from 'rxjs/internal/observable/of';
import { tap } from 'rxjs/internal/operators/tap';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    return of(true);
  } else {
    return of(false).pipe(
      tap(() => router.navigate(['/login'], { queryParams: { returnUrl: state.url } }))
    );
  }
};
