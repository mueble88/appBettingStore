import { Component, OnInit, Inject} from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';


@Component({
  selector: 'app-message-componet',
  templateUrl: './messageComponent.html',
  styleUrls: ['./messageComponent.css']
})

export class MessageComponent implements OnInit  {

  message:string = "";

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any){}

  ngOnInit(): void {
    this.printConfirmationMessage();
  }

  printConfirmationMessage():void{
    this.message= this.data.message;
  }


}
