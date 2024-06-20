import { Component, Input } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/loginService/login.service';
import { TeamService } from 'src/app/shared/services/teamService/team.service';

@Component({
  selector: 'app-list-teams',
  templateUrl: './list-teams.component.html',
  styleUrls: ['./list-teams.component.css']
})
export class ListTeamsComponent {

  titulo:string = "Equipos de futbol";
  teamsAndSize: any;
  names:any;
  shieldId:number=0;
  pictures:any;
  shield:string="";
  id:number = 0;
  teamId:number=0;
  left:string = "<";
  right:string = ">";
  number:number=0

  //variables de paginacion
  team:any; // equipo actual
  teams: any; // arreglo de los equipos
  totalPages:number = 0; // numero de paginas son 6
  numberOfElements:number | any = 0; // numero de elementos por pagina son 10
  totalElements:number = 0 // total de elementos

  //parametros de consulta
  name:string = "";
  pageNumber:number = 0; // la posicion del arreglo en la pagina de la api
  pageSize:number = 10; // numero de elementos por pagina
  pageSizeOptions:number[]=[5,10,20];
  pageEvent: PageEvent = new PageEvent;
  sort:string = "asc";

  constructor(private loginService:LoginService,
              private router:Router,
              private teamService:TeamService,
              public _MatPaginatorIntl: MatPaginatorIntl,
              ){}

  ngOnInit():void{
    this.titulo
    this.loadUsers();
    this.loginService.getCurrentToken();
  }

  loadUsers(){
    let token = this.loginService.getCurrentToken();
    if(token !== null){
        this.teamService.getTeamsWithPagination(this.pageNumber, this.pageSize, this.name, this.sort).subscribe(res =>{
          this.teamsAndSize = res;
          this.teams = this.teamsAndSize.response.content;
          this.totalPages = this.teamsAndSize.response.totalPages;
          this.pageNumber = this.teamsAndSize.response.number;
          this.numberOfElements = this.teamsAndSize.response.numberOfElements;
          this.totalElements = this.teamsAndSize.response.totalElements;
          // console.log("teams",this.teams);
          // console.log("total paginas totalPages",this.totalPages);
          // console.log("numero de la pagina numberPage",this.pageNumber);
          // console.log("numero de elementos por pagina numberOfElements",this.numberOfElements);
          // console.log("total de elementos",this.totalElements);
        });
    }else{
      this.router.navigate(['login']);
    }
  }

  handlePage(event: PageEvent){
    if(event){
      this.pageEvent = event;
      this.pageSize = this.pageEvent.pageSize;
      this.pageNumber = this.pageEvent.pageIndex;
      this.loadUsers();
    }
  }

  sortAscendingOrDescending(number:number, name:string){
    if(number){
      this.sort = "asc";
      this.name = name
      this.loadUsers();
    }else{
      this.sort = "desc";
      this.name = name;
      this.loadUsers();
    }
  }

  sortAscendingName(){
    // console.log('dio click');
    this.sort = "asc";
    this.name = "name"
    this.loadUsers();
  }

  sortDescendingName(){
    this.sort = "desc";
    this.name = "name"
    this.loadUsers();
  }

  sortAscendingDT(){
    this.sort = "asc";
    this.name = "dt"
    this.loadUsers();
  }

  sortDescendingDT(){
    this.sort = "desc";
    this.name = "dt"
    this.loadUsers();
  }

  goToTeamDetails(id:number) {
    this.router.navigateByUrl("teamdetails/"+id);
    this.teamService.get(id).subscribe(data => this.team = data);
  }

  goToTeamEdit(id:number){
    this.router.navigateByUrl("teamedit/"+id);
    this.teamService.get(id).subscribe(data => this.team = data);
  }


}
