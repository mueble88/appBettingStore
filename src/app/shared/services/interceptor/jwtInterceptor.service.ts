import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS, HttpInterceptor} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../loginService/login.service';

@Injectable({
  providedIn:'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private router:Router, private loginService: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.loginService.getCurrentToken() //token jwt
    // console.log("token interceptor",token);
    let req = request;

    if(token){
      req = request.clone({setHeaders:{
        Authorization: `Bearer ${ token }`,
        ContentType: "application/json"
      }});
    }else{
      req = request.clone({setHeaders:{
        ContentType: "application/json"
      }});
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log("err",err);
        if (err.status === 401) {
          //redirigir al login cuando el token haya expirado o no tenga un token válido
          this.router.navigateByUrl('/login');
          console.log("error 401: ");
        }
        if(err.status === 403){
          //redirigir al login cuando no este autenticado
          console.log("error 403");
        }
        return throwError( err );
      })
    );
  }

}
