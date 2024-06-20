import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user/user';
import { map, tap } from 'rxjs/operators';
import { ChangePasswordDTO } from '../../models/changePasswordDTO/changePasswordDTO';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private url:string="http://localhost:8080/api/user";
  private urlEmail:string="http://localhost:8080/api/user/email";
  private urlUsers:string="http://localhost:8080/api/users";
  private urlChangePassword:string="http://localhost:8080/api/changePassword";
  oneUsuario: User[] = [];

  constructor( private http:HttpClient) { }

  getAll():Observable<User[]>{
    return this.http.get<User[]>(this.urlUsers).pipe(map((response:User[]) => {
      console.log("response",response);
      for(let i=0; i < response.length; i++ ){
        let creationDate = new Date(response[i].createdAt*1000);
        response[i].createdAtDate = creationDate;
        let modificationDate = new Date(response[i].lastUpdatedAt*1000);
        response[i].lastUpdatedAtDate = modificationDate;
      }
      return response;
    }));
  }

  getUsersWithPagination(offset:number, pageSize:number, name:string, sort:string):Observable<User[]>{
    let queryParams = new HttpParams()
    queryParams = queryParams.append("offset",offset)
    queryParams = queryParams.append("pageSize",pageSize)
    queryParams = queryParams.append("field",name)
    queryParams = queryParams.append("sort",sort)
    // console.log("queryParams",queryParams);
    return this.http.get<any>(this.urlUsers,{params:queryParams})
    .pipe(
      map((users:User[]) => {
        console.log(users);
        for(let i=0; i < users.length; i++ ){
          let creationDate = new Date(users[i].createdAt*1000);
          users[i].createdAtDate = creationDate;
          let modificationDate = new Date(users[i].lastUpdatedAt*1000);
          users[i].lastUpdatedAtDate = modificationDate;
        }
        return users;
      }
    ));
  }

  create(usuario:User):Observable<User>{
    return this.http.post<User>(this.url, usuario);
  }

  //trae un userDTO de la api
  get(id:number):Observable<User>{
    return this.http.get<User>(this.url+'/'+id);
  }

  getForEmail(email:string):Observable<User>{
    return this.http.get<User>(this.urlEmail+'/'+email);
  }

  update(id:number, usuario:User):Observable<any>{
     let fecha = new Date(usuario.createdAt*1000) ;
    //  usuario.creationDate = fecha.toLocaleString();
    return this.http.put<User>(this.url+'/'+id, usuario);
  }

  delete(id:number):Observable<Object>{
    return this.http.delete(this.url+'/'+id);
  }

  updatePassword(usuario:ChangePasswordDTO):Observable<Object>{
    return this.http.post(this.urlChangePassword,usuario).pipe(tap( // Log the result or error
    {
      next: (data) =>{
        console.log("nextUpdate",data);
        // this.userChanged.emit(data);
        // localStorage.setItem("usuarioActual", JSON.stringify(data));
      },
      error: (error) =>{
        console.log(error);
      }
    }));
  }

}
