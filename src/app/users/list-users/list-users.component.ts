import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user/user';
import { LoginService } from 'src/app/shared/services/loginService/login.service';
import { UserService } from 'src/app/shared/services/userService/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent {

  titulo:string = "Lista de usuarios";
  usersAndSize:any;
  usuarios: User[] = [];
  totalElements:number = 0 // total de elementos
  totalPages:number = 0; // numero de paginas son 6
  numberOfElements:number | any = 0; // numero de elementos por pagina son 10
  number:number = 0;

  //parametros de consulta
  name:string = "";
  pageNumber:number = 0; // la posicion del arreglo en la pagina de la api
  pageSize:number = 10; // numero de elementos por pagina
  pageSizeOptions:number[]=[5,10,20];
  pageEvent: PageEvent = new PageEvent;
  sort:string = "asc";

  constructor(private userService:UserService,
              private loginService:LoginService,
              private router:Router) { }

  ngOnInit(): void {
    this.titulo
    this.loadUsers();
    this.loginService.getCurrentToken();
  }

  loadUsers(){
    let token = this.loginService.getCurrentToken();

    if(token !== null){
      // this.userService.getAll().subscribe(users => this.usuarios = users);
      this.userService.getUsersWithPagination(this.pageNumber, this.pageSize, this.name, this.sort).subscribe(res =>{
        this.usersAndSize = res;
        this.usuarios = this.usersAndSize.response.content;
        this.totalPages = this.usersAndSize.response.totalPages;
        this.pageNumber = this.usersAndSize.response.number;
        this.numberOfElements = this.usersAndSize.response.numberOfElements;
        this.totalElements = this.usersAndSize.response.totalElements;
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

}
