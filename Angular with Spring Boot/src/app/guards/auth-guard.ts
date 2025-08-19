import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthService } from "../service/auth.service";


export class authGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isLogIn() && (this.authService.isAdmin() || this.authService.isConsumer())) {
      return true;
    }
    return this.router.createUrlTree(['/login']);
  }
};
