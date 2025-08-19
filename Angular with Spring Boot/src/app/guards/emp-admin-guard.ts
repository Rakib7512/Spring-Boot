import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../service/auth.service";


export class empAdminGuard implements CanActivate{
   constructor(private authService: AuthService, private router: Router) {}


  canActivate(): boolean | UrlTree  {
   if (this.authService.isLogIn() && (this.authService.isAdmin() || this.authService.isConsumer())) {
      return true;
    }
    return this.router.createUrlTree(['/login']);
  }
}
