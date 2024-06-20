import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePasswordDTO } from 'src/app/shared/models/changePasswordDTO/changePasswordDTO';
import { User } from 'src/app/shared/models/user/user';
import { LoginService } from 'src/app/shared/services/loginService/login.service';
import { UserService } from 'src/app/shared/services/userService/user.service';
import { MyValidations } from 'src/app/shared/utils/my_validations';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  emailPattern:any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  userForm: FormGroup<any> = new FormGroup({});
  resultado!:string;
  message:string="";
  messageEmail:string="";
  messageOldPassword:string="";
  messageNewPassword:string="";
  messageCheckPassword:string="";
  actualizacionPassword!:string;
  objectToValidate:any={};
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

  constructor(
    private loginService:LoginService,
    private userService:UserService,
    private router:Router,
    private formBuilder:FormBuilder,
    private login:LoginService){}

  // get email() { return this.userForm.get('email') as FormControl; }
  get oldPassword() { return this.userForm.get('oldPassword') as FormControl; }
  get newPassword() { return this.userForm.get('newPassword') as FormControl; }
  get checkPassword() { return this.userForm.get('checkPassword') as FormControl; }

  ngOnInit(): void {
    this.userForm = this.createFormGroup();
    this.loginService.getCurrentUser();
  }

  changePassword(){
    let userAuthenticated = this.loginService.getCurrentUser();
    if(userAuthenticated != null || undefined){
      if(this.userForm.valid){
          this.message="";
          let user = this.loginService.getCurrentUser();
          let usuario:ChangePasswordDTO={
            email:user.email,
            oldPassword:this.userForm.value.oldPassword,
            newPassword:this.userForm.value.newPassword
          }
          if(usuario.oldPassword !== usuario.newPassword){
            this.messageNewPassword="";
            if(usuario.newPassword === this.userForm.value.checkPassword){
              this.messageCheckPassword="";
              this.userService.updatePassword( usuario ).subscribe(
                data=>{
                  this.messageOldPassword="";
                  this.objectToValidate = data;
                  if(data != null || undefined){
                    if(this.objectToValidate.status === 200){
                      alert("Contraseña actualizada correctamente");
                    }
                  }
                },
                error=>{
                  console.log(error);
                  console.log(error.status);
                  if(error.status !== 200){
                    this.actualizacionPassword = "La contraseña no se pudo actualizar";
                    this.messageOldPassword="*Su contraseña no es valida";
                    this.message="";
                  }
                }
                );
            }else{
              this.messageCheckPassword="Repita la nueva contraseña";
              this.message="";
            }
          }else{
            this.messageNewPassword="*La contraseña nueva debe ser diferente";
            this.message="";
          }
      }else{
        console.log('No valid');
      }
      this.validatedFieldEmpty();
    }
  }

  createFormGroup(){
    return this.formBuilder.group({
      //email: new FormControl('',[Validators.required, Validators.minLength(11), Validators.pattern(this.emailPattern), Validators.email]),
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      checkPassword: new FormControl('', [Validators.required, MyValidations.comparePasswords, MyValidations.checkPasswords])
    });
  }

  validatedFieldEmpty():void{
    if(this.userForm.invalid){
      this.message="*Todos los campos son obligatorios";
    }else{
      this.message="";
    }
  }

  onResetForm(numero:number){
    this.userForm.reset();
  }

}
