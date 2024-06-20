import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamDto } from 'src/app/shared/models/teamDto/teamDto';
import { LoginService } from 'src/app/shared/services/loginService/login.service';
import { TeamService } from 'src/app/shared/services/teamService/team.service';
import { MyValidations } from 'src/app/shared/utils/my_validations';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit, OnDestroy {

  sub:any;
  team:any;
  id:number = 0;
  hrefFacebook:string="";
  hrefInstagram:string="";
  hrefGoogle:string="";
  shield:string = "";
  teamActual:TeamDto={
    id:0,
    name:"",
    dt:"",
    hrefFacebook:"",
    hrefInstagram:"",
    hrefGoogle:"",
    image:""
  }
  imageFile: File[] = [];
  loading:boolean = false;
  teamForm: FormGroup<any> = new FormGroup({});
  messageName:string="";
  messageDt:string="";
  messageFacebook:string="";
  messageInstagram:string="";
  messageGoogle:string="";
  message:string="";
  objectToValidate:any={};

  constructor(public teamService: TeamService,
              private loginService:LoginService,
              private route: ActivatedRoute,
              private formBuilder:FormBuilder,
              private router:Router){}


  get name() { return this.teamForm.get('name') as FormControl; }
  get dt() { return this.teamForm.get('dt') as FormControl; }

  ngOnInit(): void {
    this.loadTeam()
    this.teamForm = this.createFormGroup();
    this.loginService.getCurrentToken();
  }

  loadTeam():void{
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
    });
    this.teamService.get(this.id).subscribe(
      res=>{
        this.team = res;
        console.log(this.team);
      },
    );
  }

  onSelect(event:any) {
    console.log("event:",event);
    this.imageFile.push(...event.addedFiles);
    console.log('image files',this.imageFile);
  }

  findImage() {
    // this.service.getImage().subscribe(image => {
    // this.imageFile = image.imageUrl
    // }
  }

  onRemove(event:any) {
    console.log(event);
    this.imageFile.splice(this.imageFile.indexOf(event), 1);
  }

  // captureFile(event:any):any{
  //   console.log("event",event.target.files);
  //   const archivoCapturado = event.target.files[0];
  //   this.files.push(archivoCapturado);
  // }

  actualizar():void{
    if(this.teamForm.valid){
      this.message;
      console.log("valid:",this.teamForm.valid);
      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id']; // (+) converts string 'id' to a number
        // In a real app: dispatch action to load the details here.
        let team = this.teamService.get(this.id);
      let equipo:TeamDto={
        id:this.id,
        name:this.teamForm.value.name,
        dt:this.teamForm.value.dt,
        hrefFacebook:"",
        hrefInstagram:"",
        hrefGoogle:"",
        image:"",
      }
      console.log("datos equipo:",equipo);
      let token = this.loginService.getCurrentToken();
      if(token !== null){
        this.loading = true;
        this.teamService.update(equipo.id, equipo.name, equipo.dt, this.imageFile ).subscribe(
          data=>{
            this.objectToValidate = data;
            this.loading = false;
            console.log("objectToValidate",this.objectToValidate);
            if(data != null || data != undefined){
              if(this.objectToValidate.status === 200){
                alert("equipo actualizado correctamente");
                console.log("equipo actualizado correctamente");
              }
            } else{
              alert ("El equipo no se pudo actualizar");
              console.log("No se actualizo");
            }
          },
          error=>{
            console.log(error);
            console.log(error.status);
            if(error.status !== 200){
              // this.actualizacionPassword = "La contraseña no se pudo actualizar";
              // this.messageOldPassword="*Su contraseña no es valida";
              this.message="";
            }
          }
          );
      }else{
        console.log("no hay token para poder actualizar equipo");
      }
      this.validatedFieldEmpty();
      });

    }
  }

  createFormGroup(){
    return this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
      dt: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    });
  }

  validatedFieldEmpty():void{
    if(this.teamForm.invalid){
      this.message="*Todos los campos son obligatorios";
    }else{
      this.message="";
    }
  }

  cerrar(){
    this.router.navigate(['teams']);
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
    // throw new Error('Method not implemented.');
  }

  onResetForm(numero:number){
    this.teamForm.reset();
  }

}
