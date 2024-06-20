import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/shared/services/loginService/login.service';
import { PopupTeamEditComponent } from '../popup-team-edit/popup-team-edit.component';

@Component({
  selector: 'app-button-edit',
  templateUrl: './button-edit.component.html',
  styleUrls: ['./button-edit.component.css']
})
export class ButtonEditComponent {

  @Input() team:any

  constructor(private dialog: MatDialog,
              private loginService:LoginService){}

  ngOnInit(): void {
    this.openDialog
    this.loginService.getCurrentToken()
  }

  openDialog(){
    const dialogRef =  this.dialog.open(PopupTeamEditComponent,{
      width:'400px',
      data:{id:this.team.id}
     });
     dialogRef.afterClosed().subscribe(result => {
      if(result){
        // this.onUserUpdated.emit();
        console.log(result)
      }
    });
  }


}
