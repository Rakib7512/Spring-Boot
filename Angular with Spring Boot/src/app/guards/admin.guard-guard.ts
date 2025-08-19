import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../service/auth.service";
import { Inject, PLATFORM_ID } from "@angular/core";
import { Observable } from "rxjs";


export class adminGuardGuard implements CanActivate {

    constructor(
    private authService: AuthService,
    private router: Router,    
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  
  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> {
    if (this.authService.isLogIn() && this.authService.isAdmin()) {
      return true;
    }
    // Redirect to login page or unauthorized page
    return this.router.createUrlTree(['/login']);
  }

 
}
