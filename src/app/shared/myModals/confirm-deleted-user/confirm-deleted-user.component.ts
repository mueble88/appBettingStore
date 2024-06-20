import { Component } from '@angular/core';
import { UserService } from '../../services/userService/user.service';

@Component({
  selector: 'app-confirm-deleted-user',
  templateUrl: './confirm-deleted-user.component.html',
  styleUrls: ['./confirm-deleted-user.component.css']
})
export class ConfirmDeletedUserComponent {

  swth:boolean = false;
  event:boolean = false;

  constructor(private userService:UserService,
              ){}
// constructor:public dialogRef:MatDialogRef<ConfirmDeletedUserComponent>,
              // @Inject(MAT_DIALOG_DATA) public message:string

  ngOnInit(): void {
    this.swth = true;
  }

  onClickSi():void{
    // console.log("Si deseo borrar el usuario");
    // this.dialogRef.close(this.event = true);
  }

  onClickNo():void{
    // this.dialogRef.close(this.event);
  }

  // imprimirMensaje(){
  //   this.message = this.data.data
  // }

}
