import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/loginService/login.service';
import { UserService } from 'src/app/shared/services/userService/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './editProfile.component.html',
  styleUrls: ['./editProfile.component.css']
})
export class EditProfileComponent implements OnInit {

  message:string = "";
  name:string = "";
  lastName:string = "";
  email:string = "";

  constructor(
    private loginService:LoginService,
    private userService:UserService,
    private router:Router,) { }

  ngOnInit(): void {
    let actual = this.loginService.getCurrentUser();
    console.log(actual)
    this.loadUser();
  }

  loadUser():void{
    let userAuthenticated = this.loginService.getCurrentUser();
    if(userAuthenticated != null || undefined){
          this.message="Welcome to your profile";
          let user = this.loginService.getCurrentUser();
          console.log(user);
          this.name = user.name;
          this.lastName = user.lastName;
          this.email = user.email;
          let id = user.id;
          console.log(id);
    }
  }

}
