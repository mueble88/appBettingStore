import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user/user';
import { LoginService } from 'src/app/shared/services/loginService/login.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  nombreUsuario:string = "Perfil";
  apellidoUsuario:string = "de usuario";
  subscription:any;

  usuarioActual:User = {
    id:0,
    name:this.nombreUsuario,
    lastName:this.apellidoUsuario,
    email:"",
    phone:"",
    dateOfBirth: new Date(),
    password:"",
    createdAt:0,
    lastUpdatedAt:0,
    createdAtDate:new Date(),
    lastUpdatedAtDate:new Date(),
  }

  constructor(private loginService:LoginService, private router:Router){}

  ngOnInit(): void {
    this.loginService.getUserChangedEmitter().subscribe((user) =>{
      this.usuarioActual = user;
      this.userProfile(this.usuarioActual);
    });
    this.usuarioActual = this.loginService.getCurrentUser();
    this.userProfile(this.usuarioActual);
  }

  userProfile(user:User){
    let validarObjeto:boolean = Object.keys(user).length === 0;
    if(validarObjeto){
      this.nombreUsuario = "Perfil";
      this.apellidoUsuario = "de usuario";
      this.router.navigate(['login']);
    }else{
      this.nombreUsuario = user.name;
      this.apellidoUsuario = user.lastName;
    }
  }

  goChangePassword(){
    let noIsAuthenticated = this.loginService.noIsAuthenticated();
    if(noIsAuthenticated){
      this.router.navigate(['login']);
    }else{
      this.router.navigate(['changepassword']);
    }
  }

  goEditProfile(){
    let noIsAuthenticated = this.loginService.noIsAuthenticated();
    if(noIsAuthenticated){
      this.router.navigate(['login']);
    }else{
      this.router.navigate(['editprofile']);
    }
  }

}
