import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/loginService/login.service';
import { PictureService } from 'src/app/shared/services/picture/picture.service';
import { TeamService } from 'src/app/shared/services/teamService/team.service';
import { UserService } from 'src/app/shared/services/userService/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  teamId:number = 0;
  name:string="";
  dt:string="";
  hrefFacebook:string="";
  hrefInstagram:string="";
  hrefGoogle:string="";
  shield:string="";
  team:any;
  id:number = 0;
  sub:any;
  text:string = "";
  userCurrent:any;
  user:any = {};

  constructor(private teamService: TeamService,
              private userService: UserService,
              private pictureServicio:PictureService,
              private loginService:LoginService,
              private router:Router,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.loginService.getCurrentToken();
    this.loadTeam();
    this.loadUser();
  }

  loadTeam():void{
    let token = this.loginService.getCurrentToken();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
      console.log(this.id);
      if(token !== null){
        this.teamService.get(this.id).subscribe(
          data=>{
            this.team = data
            this.name = this.team.name;
            this.dt = this.team.dt;
            this.hrefFacebook = this.team.hrefFacebook;
            this.hrefInstagram = this.team.hrefInstagram;
            this.hrefGoogle = this.team.hrefGoogle;
            this.shield = this.team.shield.image
          },
        );
      }else{
        this.router.navigate(['teams']);
      }
    });
  }

  loadUser(){
    let token = this.loginService.getCurrentToken();
    if(token !== null){
      this.userCurrent = this.loginService.getCurrentUser()
      console.log(this.userCurrent)
      this.userService.getForEmail(this.userCurrent.email).subscribe(data=>{
        this.user = data;
        console.log(data);
        this.user.text = this.text;
        this.userService.update(this.user.id, this.user).subscribe(res=>{

        })

      })
    }
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
    // throw new Error('Method not implemented.');
  }

}
