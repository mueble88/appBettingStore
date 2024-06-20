import { Component } from '@angular/core';
import { LoginService } from 'src/app/shared/services/loginService/login.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  currentUser:boolean=false;
  usuarioActual:Object = {};
  printMessage:boolean = false;
  message:string = "";

  constructor(private loginService:LoginService){}

  ngOnInit(): void {
    this.loginService.getUserChangedEmitter().subscribe((user) =>{
      this.usuarioActual = user;
      this.isAuthenticated(this.usuarioActual);
    });
    this.usuarioActual = this.loginService.getCurrentUser();
    this.isAuthenticated(this.usuarioActual);
  }

  isAuthenticated(user:Object):boolean{
    let validarObjeto:boolean = Object.keys(user).length === 0;
    if(validarObjeto || user === null || user === undefined){
      return this.currentUser = false;
    }
    return this.currentUser = true;
  }

}
