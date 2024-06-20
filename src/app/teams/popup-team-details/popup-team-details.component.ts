import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/shared/services/loginService/login.service';
import { PictureService } from 'src/app/shared/services/picture/picture.service';
import { TeamService } from 'src/app/shared/services/teamService/team.service';

@Component({
  selector: 'app-popup-team-details',
  templateUrl: './popup-team-details.component.html',
  styleUrls: ['./popup-team-details.component.css']
})
export class PopupTeamDetailsComponent {

  teamId:number=0
  name:string=""
  dt:string=""
  shield:string=""
  team:any;
  team2:any;

  constructor(public dialogRef: MatDialogRef<PopupTeamDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              public teamService: TeamService,
              private pictureServicio:PictureService,
              private loginService:LoginService){}


  ngOnInit(): void {
    this.loadTeam()
    this.loginService.getCurrentToken();
  }

  loadTeam():void{

    this.teamId = this.data.id
    this.teamService.get(this.teamId).subscribe(
      res=>{
        this.team = res;
        this.name = this.team.name;
        this.dt = this.team.dt;
        this.shield = this.team.shield.image
      },
      err=>console.log(err)
    );
  }

  cerrar(){
    this.dialogRef.close(false);
  }


}
