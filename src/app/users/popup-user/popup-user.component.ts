import { Component, Inject, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user/user';
import { LoginService } from 'src/app/shared/services/loginService/login.service';
import { UserService } from 'src/app/shared/services/userService/user.service';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-user',
  templateUrl: './popup-user.component.html',
  styleUrls: ['./popup-user.component.css']
})
export class PopupUserComponent implements OnInit {

  userId:number=0
  userName:string=""
  userLastName:string=""
  userEmail:string=""
  userPhone:string=""
  dateOfBirth!: Date
  userPassword:string=""
  createdAtDate!:Date
  lastUpdatedAtDate!:Date


  usuarioActual:User = {
    id:0,
    name:'',
    lastName:"",
    email:"",
    phone:"",
    dateOfBirth:this.dateOfBirth,
    password:"",
    createdAt:0,
    lastUpdatedAt:0,
    createdAtDate:this.createdAtDate,
    lastUpdatedAtDate:this.lastUpdatedAtDate,
  }

    constructor(private userService:UserService,
                public loginService:LoginService,
                public dialogRef: MatDialogRef<PopupUserComponent>,
                @Inject(MAT_DIALOG_DATA) public data:any){}

    ngOnInit(): void {
      this.loadUser()
    }

    loadUser():void{
      this.userId = this.data.id
      this.userService.get(this.userId).subscribe(
        res=>{
          this.usuarioActual = res
        },
        err=>console.log(err)
      );
    }

    actualizar():void{
      this.userId = this.data.id

      this.usuarioActual.id = this.userId

      this.userService.update(this.userId, this.usuarioActual).subscribe(
        res=>{
          if(res != null || res != undefined){
            this.usuarioActual = res;
            console.log("este es el usuario actual: ",this.usuarioActual);
            this.dialogRef.close(true);
          } else{
            alert ("El usuario no se pudo actualizar");
          }
        },
        err=>console.log(err)
        )
      }

    cerrar(){
      this.dialogRef.close(false);
    }

}
