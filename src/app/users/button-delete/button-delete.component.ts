import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeletedUserComponent } from 'src/app/shared/myModals/confirm-deleted-user/confirm-deleted-user.component';
import { SwitchService } from 'src/app/shared/services/switch/switch.service';
import { UserService } from 'src/app/shared/services/userService/user.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { MessageComponent } from 'src/app/shared/snackBar/messageComponent';


@Component({
  selector: 'app-button-delete',
  templateUrl: './button-delete.component.html',
  styleUrls: ['./button-delete.component.css']
})
export class ButtonDeleteComponent {

  @Input()
  id:number=0;
  @Input()
  name:string="";
  @Output()
  onUserDeleted = new EventEmitter<void>();
  dialogSwitch:boolean = false;

  constructor(public userService:UserService,
              public dialog:MatDialog,
              public snackBar:MatSnackBar,
              private dialogService:SwitchService){}

  ngOnInit(): void {
    this.dialogService.$dialog.subscribe((valor)=>{
      this.dialogSwitch = valor
    });
  }

  borrarUsuario(id:number){
      this.dialogSwitch = true;
      this.id = id
      this.openDialog(this.id);
  }

  openDialog(id:number):void{

    this.userService.get(id).subscribe(data=>{
      let name = data.name;
      let lastName = data.lastName;
      const dialogRef = this.dialog.open(ConfirmDeletedUserComponent, {
        width:'310px',
        data: '¿Esta seguro que quieres borrar a ' +name+' '+lastName+ ' de la lista?'
      });
      console.log('dialogRef: ',dialogRef);
      dialogRef.afterClosed().subscribe(res =>{
        let onClick = res;
        if(onClick){
          this.userService.delete(id).subscribe(() =>{
                  let snackBarRef = this.snackBar.openFromComponent(MessageComponent,
                  {
                    data:{message:'Usuario borrado correctamente'},
                    duration:2000,
                    verticalPosition:'top'
                  });
                  console.log("Usuario borrado correctamente");
                  this.onUserDeleted.emit();
              });
      }else{
        let snackBarRef = this.snackBar.openFromComponent(MessageComponent,
        {
          data:{message:'NO se borro el usuario'},
          duration:2000,
          verticalPosition:'top',
          panelClass:['blue-snackbar']
        });
      }});
    });
  }

}
