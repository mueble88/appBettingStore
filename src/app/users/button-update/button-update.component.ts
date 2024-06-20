import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopupUserComponent } from '../popup-user/popup-user.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-button-update',
  templateUrl: './button-update.component.html',
  styleUrls: ['./button-update.component.css']
})
export class ButtonUpdateComponent {

  @Input() usuario:any
  @Output() onUserUpdated = new EventEmitter<void>();


  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.openDialog
  }

  openDialog():void{
    const dialogRef =  this.dialog.open(PopupUserComponent,{
      data:{id:this.usuario.id}
     });
     dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.onUserUpdated.emit();
        console.log(result)
      }
    });
  }

}
