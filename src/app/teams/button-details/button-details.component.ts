import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/shared/services/loginService/login.service';
import { PopupTeamDetailsComponent } from '../popup-team-details/popup-team-details.component';

@Component({
  selector: 'app-button-details',
  templateUrl: './button-details.component.html',
  styleUrls: ['./button-details.component.css']
})
export class ButtonDetailsComponent {

  @Input() team:any

  constructor(private dialog: MatDialog,
              private loginService:LoginService){}

  ngOnInit(): void {
    this.openDialog
    this.loginService.getCurrentToken();
  }

  openDialog(){
   const dialogRef =  this.dialog.open(PopupTeamDetailsComponent,{
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
