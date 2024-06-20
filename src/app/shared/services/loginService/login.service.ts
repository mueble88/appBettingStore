
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from '../../models/user/user';
import { find, Observable, tap } from 'rxjs';
import { LoginDTO } from '../../models/loginDto/loginDTO';

@Injectable({providedIn:'root'})

export class LoginService{

  private urlLogin:string="http://localhost:8080/api/login";
  userChanged:EventEmitter<any> = new EventEmitter();
  user:any = {
    token: '',
    name: '',
    lastName: ''
  };

  constructor( private http:HttpClient ) { }

  login(usuario:LoginDTO):Observable<any> {
    return this.http.post(this.urlLogin, usuario).pipe(tap({
      next: (data) =>{
        this.user = data;
        // console.log("next:data login",this.user);
        // console.log(this.user.token);
        this.userChanged.emit(data);
        localStorage.setItem("usuarioActual", JSON.stringify(data));
      },
      error: (error) =>{
        console.log("error login",error);
        error;
        // la respuesta de error.error es Unauthorized
      }
    }));
  }

  getCurrentUser():User{
    let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
    return usuarioActual;
  }

  getCurrentToken():string{
    let obj = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
    let token = obj.token;
    return token;
  }

  getUserProfile():User{
    return this.user;
  }

  noIsAuthenticatedToken():Boolean{
    let token = this.getCurrentToken();
    let validarObjeto = Object.keys(token).length === 0;
    if(validarObjeto || token == null || token == undefined){
      return true;
    }
    return false;
  }

  noIsAuthenticated():Boolean{
    let user = this.getCurrentUser();
    let validarObjeto = Object.keys(user).length === 0;
    if(validarObjeto || user == null || user == undefined){
      return true;
    }
    return false;
  }

  logout():void{
    localStorage.removeItem('usuarioActual');
    this.userChanged.emit({});
  }

  getUserChangedEmitter():EventEmitter<any> {
    return this.userChanged;
  }

}
