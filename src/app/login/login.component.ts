import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTO } from 'src/app/shared/models/loginDto/loginDTO';
import { User } from 'src/app/shared/models/user/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LoginService } from 'src/app/shared/services/loginService/login.service';
import { UserService } from 'src/app/shared/services/userService/user.service';
import { MyValidations } from 'src/app/shared/utils/my_validations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  emailPattern:any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passwordPattern:any = /^[0-9]+/;
  passwordPattern2:any = /^[a-zA-Z0-9_]*$/;
  userForm: FormGroup<any> = new FormGroup({});
  registeredUser:boolean = false;
  message:string="";
  messageError:string="";
  objectToValidate: any ={};
  usuarioActual:User = {
    id:0,
    name:'',
    lastName:"",
    email:"",
    phone:"",
    dateOfBirth: new Date(),
    password:"",
    createdAt:0,
    lastUpdatedAt:0,
    createdAtDate:new Date(),
    lastUpdatedAtDate:new Date(),
  };


  constructor( private loginService:LoginService, private userService:UserService, private router: Router, private formBuilder:FormBuilder, private authService:AuthService) { }

  get email(){return this.userForm.get('email') as FormControl}
  get password(){return this.userForm.get('password') as FormControl}

  ngOnInit():void {
    this.userForm = this.createFormGroup();
    this.loginService.getUserChangedEmitter().subscribe((user) =>{
    });
    this.loginService.getCurrentToken();
  }

  login():void {
    if(this.userForm.valid){
      const usuario:LoginDTO = {email: this.userForm.value.email, password: this.userForm.value.password};
      this.loginService.login(usuario).subscribe(
        data=>{
          this.objectToValidate = data;
          this.validatedUserToken(this.objectToValidate);
          this.router.navigate(['users']);
          this.authService.login();
        },
        error=>{
          this.objectToValidate = error;
          console.log(this.objectToValidate);
          if(this.objectToValidate.error === "Unauthorized" || this.objectToValidate.status !== 200){
            this.validatedUserToken(this.objectToValidate);
          }
        }
      );
      this.validatedFieldEmpty();
    }else{
      console.log('No valid');
      this.validatedFieldEmpty();
    }
  }

  createFormGroup(){
    return this.formBuilder.group({
      email: new FormControl('',[Validators.required, Validators.minLength(11),Validators.pattern(this.emailPattern),Validators.email,MyValidations.validatedField]),
      password: new FormControl('',[Validators.required, Validators.minLength(3),Validators.maxLength(10),Validators.pattern(this.passwordPattern),MyValidations.validatedField])
    });
  }

  validatedFieldEmpty():void{
    if(this.userForm.invalid){
      this.message="*Todos los campos son obligatorios";
    }else{
      this.message="";
    }
  }

  validatedUser(objectToValidate:any):void{
    if(objectToValidate.error === "Unauthorized"){
      this.messageError="*Correo o contraseña no son validos";
    }else{
      if(objectToValidate.email === this.userForm.value.email || objectToValidate.password === this.userForm.value.password){
        console.log("OK... usuario valido");
      }else{
        this.messageError="";
      }
    }
  }

  validatedUserToken(objectToValidate:any):void{
    if(objectToValidate.error === "Unauthorized"){
      this.messageError="*Correo o contraseña no son validos";
    }else{
      if(objectToValidate.token !== null || objectToValidate.token !== undefined){
        console.log("OK... usuario valido");
      }else{
        this.messageError="";
      }
    }
  }

}
