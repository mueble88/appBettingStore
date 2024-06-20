import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Picture } from '../../models/picture/picture';

@Injectable({
  providedIn: 'root'
})

export class PictureService {

  private url:string="http://localhost:8080/api/picture";
  private urlPictures:string="http://localhost:8080/api/pictures";
  private urlPicture:string="http://localhost:8080/api/picture"
  oneTeam: Picture[] = [];

  constructor( private http:HttpClient) { }

  getAll():Observable<Picture[]>{
    return this.http.get<Picture[]>(this.urlPictures).pipe(map((response:Picture[]) => {
      console.log(response);
      return response;
    }));
  }

  get(id:number):Observable<Picture>{
    return this.http.get<Picture>(this.url+'/'+id);
  }

  getPicture(id:number):Observable<string>{
    return this.http.get<string>(this.urlPicture+'/'+id);
  }

}
