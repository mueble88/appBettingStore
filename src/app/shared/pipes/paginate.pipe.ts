import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {
/*
  transform(teams:any[], pageSize:number,  pageNumber:number = 0):any[]{
    console.log(teams);
    return teams.slice(pageNumber, pageNumber * pageSize);
  }*/

  transform(teams:any[], pageSize:number | any, pageNumber:number):any[]{

    if(!teams.length) return[]
    if(pageSize === 'all'){
      return teams;
    }

    pageSize = pageSize || 10;
    console.log(pageSize);
    pageNumber = pageNumber || 1;
    console.log(pageNumber);
    pageNumber = pageNumber - 1;
    console.log(pageNumber);

    let teamsSlice = teams.slice(pageNumber * pageSize, (pageNumber +1) * pageSize)
    console.log(teamsSlice)
    return teamsSlice;
  }
}
