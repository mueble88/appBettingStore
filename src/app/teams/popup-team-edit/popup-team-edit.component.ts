import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TeamDto } from 'src/app/shared/models/teamDto/teamDto';
import { LoginService } from 'src/app/shared/services/loginService/login.service';
import { TeamService } from 'src/app/shared/services/teamService/team.service';

@Component({
  selector: 'app-popup-team-edit',
  templateUrl: './popup-team-edit.component.html',
  styleUrls: ['./popup-team-edit.component.css']
})
export class PopupTeamEditComponent {

  team:any;
  name:string = "";
  dt:string = "";
  shield:string = "";
  teamActual:TeamDto={
    id:0,
    name:"",
    dt:"",
    hrefFacebook:"",
    hrefInstagram:"",
    hrefGoogle:"",
    image:""
  }
  files:any = [];
  loading:boolean = false;

  constructor(public dialogRef: MatDialogRef<PopupTeamEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              public teamService: TeamService,
              private loginService:LoginService){}


  ngOnInit(): void {
    this.loadTeam()
    this.loginService.getCurrentToken();
  }

  loadTeam():void{
    this.team = this.data
    this.teamService.get(this.team.id).subscribe(
      res=>{
        // this.teamActual = res
        console.log(res);
      },
      err=>console.log(err)
    );
  }

  captureFile(event:any):any{
    console.log("event",event.target.files);
    const archivoCapturado = event.target.files[0];
    this.files.push(archivoCapturado);
  }

  actualizar():void{

    // this.team = this.data
    let token = this.loginService.getCurrentToken();

    if(token !== null){
      this.loading = true;
      this.teamService.update(this.team.id, this.name, this.dt, this.files ).subscribe(
        res=>{
          if(res != null || res != undefined){
            this.teamActual = res;
            this.dialogRef.close(true);
            this.loading = false;
          } else{
            alert ("El equipo no se pudo actualizar");
          }
        },
        // err=>console.log(err)
        );
    }else{
      console.log("no hay token para poder actualizar equipo");
    }
  }

  cerrar(){
    this.dialogRef.close(false);
  }

}
