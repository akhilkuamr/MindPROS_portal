import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class PermissionsService {
  constructor(
    private _authService: AuthServiceService,
    public router: Router
  ) {}

  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

export const authGuardGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).canActivate();
};
