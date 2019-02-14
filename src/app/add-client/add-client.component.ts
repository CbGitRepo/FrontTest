import { Component, OnInit } from '@angular/core';
import { IClient } from '../interface';
import { HttpDataServiceService } from '../http-data-service.service';
import { Validators, FormControl , FormGroup, AbstractControl} from '@angular/forms';
import { FormsModule, ReactiveFormsModule,FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import {  ActivatedRoute, Router } from '@angular/router';
import { Capability } from 'protractor';

function emailConfirmationVAlidator(c:AbstractControl):{[key:string]:boolean}|null // if null is returned the validator is valid
{
const email=c.get('email');
const emailConfirm=c.get('emailConfirm');
if (email.value==emailConfirm.value)
return null;
return {'match':true};


}
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})


export class AddClientComponent implements OnInit {
   clientForm :FormGroup ;
   objClient: IClient;
   bFinish:boolean;
  constructor( private dataService: HttpDataServiceService, private formBuilder : FormBuilder,private route: ActivatedRoute,private router: Router) { }
  
  ngOnInit() {
    this.bFinish=false;
   this.clientForm=this.formBuilder.group(
     {
      firstName: ['',[Validators.required,Validators.minLength(2)]],
      lastName:['',[Validators.required,Validators.minLength(2)]],
      emailGroup:this.formBuilder.group({
        email: ['',[Validators.required,Validators.email]],
        emailConfirm: ['',[Validators.required,Validators.email]],
  
      },{validator: emailConfirmationVAlidator}),
      address: ['',[Validators.required,Validators.minLength(2)]],
      city: ['',[Validators.required,Validators.minLength(2)]],
      gender: ['',[Validators.required]]
     })

     //get the id from url
this.Getclient();

    /* this.clientForm= new FormGroup(
      {
        firstName: new FormControl(),
        lastName: new FormControl(),
        email: new FormControl(),
        address: new FormControl(),
        city: new FormControl(),
        gender: new FormControl()

      })
*/


//subscribe to an observable => perform an action if every time the value changes
this.clientForm.get('firstName').valueChanges.pipe(debounceTime(1000)).subscribe
(
  value=>console.warn(value)
);

}
btnClick()
      {
   const p ={...this.objClient,...this.clientForm.value}; //copy the 
   console.warn(p);  
  
   if(this.clientForm.dirty){

    this.route.paramMap.subscribe(
        params=>{
      
          const id=+params.get('id');
          console.warn("id---" +id);
          if (id==0){

            this.dataService.addClient(p).subscribe(
              () =>{this.router.navigate(['/clients'])}
           );
          console.warn("here-" +id);

          }
          else{
          this.dataService.editClient(p,id).subscribe(
              () =>{this.router.navigate(['/clients'])}
          );}
     
      })
    }
  }
SetInputVAlues():void
{
  if (this.objClient!=null&&this.bFinish)
  {
    this.clientForm.patchValue(
      {
firstName:this.objClient.firstName,
lastName:this.objClient.lastName,
address:this.objClient.address,
city:this.objClient.city
      }
    )
    this.clientForm.controls.emailGroup.patchValue(
      {
        email:this.objClient.email
      }
    )
  }
console.warn("finish");
}

 Getclient()
{
  
   this.route.paramMap.subscribe(
    params=>{
  
      const id=+params.get('id');
      console.warn("id---" +id);
      this.dataService.getClients().subscribe(
        (httpObjClient :IClient[]) =>{
          for(var i =0;i<httpObjClient.length;i++)
          { 
            if (httpObjClient[i].id==id)
            this.objClient=httpObjClient[i];
            break;
          }
          console.warn(this.objClient);
          this.SetInputVAlues();
        }, (error: any) => console.log(error)
      );
    }
  
    )
this.bFinish=true;
}
}
