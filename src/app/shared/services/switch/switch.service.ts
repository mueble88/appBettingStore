import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwitchService {

  constructor() { }

  $dialog = new EventEmitter<any>();
}
