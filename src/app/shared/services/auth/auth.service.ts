import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../loginService/login.service";
import { JwtInterceptorService } from "../interceptor/jwtInterceptor.service";

@Injectable({providedIn:'root'})
export class AuthService {

  isLoggedIn: boolean = false;
  user:object={};

  constructor(private router:Router, private loginService:LoginService, private jwt:JwtInterceptorService){}

  userIsAuthenticated():Observable<boolean | UrlTree>
  |Promise<boolean | UrlTree> | boolean | UrlTree{
    let noIsAuthenticated = this.loginService.noIsAuthenticated();
    if(noIsAuthenticated){
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  isAuthenticated():Observable<boolean | UrlTree>
  |Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(
        (resolve, reject) =>{
            setTimeout(()=>{
                resolve(this.isLoggedIn);
            },500);
        }
    ).then(
      (authenticated :any) => {
        if(authenticated){
            return true;
        }else{
            this.router.navigate(['login']);
            return false
        }
      }
    );
  }

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }
}
