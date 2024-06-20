import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Team } from '../../models/team/team';
import { formatDate } from '@angular/common';
import { TeamDto } from '../../models/teamDto/teamDto';
import { ContentObserver } from '@angular/cdk/observers';
import { HttpParams } from '@angular/common/http';
import { PaginatePipe } from 'ngx-pagination';

@Injectable({
  providedIn: 'root'
})

export class TeamService {

  private url:string="http://localhost:8080/api/team";
  private urlTeams:string="http://localhost:8080/api/teams";
  oneTeam: Team[] = [];

  constructor( private http:HttpClient) { }

  getAll():Observable<Team[]>{
    return this.http.get<Team[]>(this.urlTeams)
    .pipe(
      map((response:Team[]) => {
      console.log(response);
      return response;
    }));
  }

  getTeamsWithPagination(offset:number, pageSize:number, name:string, sort:string):Observable<Team[]>{
    let queryParams = new HttpParams()
    queryParams = queryParams.append("offset",offset)
    queryParams = queryParams.append("pageSize",pageSize)
    queryParams = queryParams.append("field",name)
    queryParams = queryParams.append("sort",sort)
    // console.log("queryParams",queryParams);
    return this.http.get<any>(this.urlTeams,{params:queryParams})
    .pipe(
      map((teams:Team[]) => {
        console.log(teams);
        return teams;
      }
    ));
  }

  getTeamsWithPaginationAndSort(offset:number,pageSize:number,field:string):Observable<Team[]>{
      return this.http.get<any>(this.urlTeams+'/paginationAndSort/'+offset+'/'+pageSize+'/'+field)
      .pipe(
        map((teams:Team[]) => {
          console.log(teams);
          return teams;
        }
      ));
  }

  create(team:Team):Observable<Team>{
    return this.http.post<Team>(this.url, team);
  }

  get(id:number):Observable<Team>{
    return this.http.get<Team>(this.url+'/'+id);
  }

  update(id:number,name:string, dt:string, files:any ):Observable<any>{
    console.log("file",files);
    const formData = new FormData();
    files.forEach((file: File) => {
      console.log("file",file);
      formData.append('image', file, file.name);
      formData.append("name", name);
      formData.append("dt", dt);
    });
    return this.http.post<any>(this.url+'/'+id, formData);
  }

}
