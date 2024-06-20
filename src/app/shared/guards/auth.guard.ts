import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth/auth.service";


@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate {

  loggedIn:boolean = false;

  constructor(private router:Router, private authService:AuthService) {}

  canActivate():Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return this.authService.userIsAuthenticated();
  }

 /* canActivate2(
    route: ActivatedRouteSnapshot,
    state:RouterStateSnapshot):Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree{
      const cookie = this.cookieService;
      if(!cookie){
        this.router.navigate(['login']);
      }
      return true;
  }
*/
  /*canActivate():Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    console.log("si ingreso?",this.authService.isAuthenticated());
    return this.authService.isAuthenticated();
  }

  canActivate(): boolean {
    console.log("si ingreso?",this.authService.isLoggedIn);
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['login']); // Si es falso lo devuelve a la página login
      return false;
    }
    return true;
  }*/




}


