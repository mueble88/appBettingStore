import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LoginService } from 'src/app/shared/services/loginService/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private loginService:LoginService, private router:Router, private authService:AuthService){}

  ngOnInit(){
    this.loginService.getCurrentUser();
  }

  logout(){
    let isAuthenticated = this.loginService.noIsAuthenticated();
    if(isAuthenticated){
      this.router.navigate(['changePassword']);
    }else{
      this.loginService.logout();
      this.router.navigate(['login']);
      this.authService.logout();
    }
  }

}
