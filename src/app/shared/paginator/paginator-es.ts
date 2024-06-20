import { MatPaginatorIntl } from "@angular/material/paginator";
import { Injectable } from "@angular/core";

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {

  override itemsPerPageLabel = 'Equipos por pagina';
  override nextPageLabel     = 'Siguiente';
  override previousPageLabel = 'Anterior';

 override getRangeLabel = function (page:number, pageSize:number, length:any) {
    // console.log(page);     // 0
    // console.log(pageSize); // 10
    // console.log(length);   // 62
    if (length === 0 || pageSize === 0) {
      return '0 od ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
  };
}

