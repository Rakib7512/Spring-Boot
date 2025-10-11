import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';

export class consumerGuardGuard implements CanActivate{


  constructor(
    private authService: AuthService,
    private router: Router, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  
  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> {
    if (this.authService.isLoggIn() && this.authService.isConsumer()) {
      return true;
    }
    return this.router.createUrlTree(['/login']);
  }
    

};
