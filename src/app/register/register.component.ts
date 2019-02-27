import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup,Validators, AbstractControl } from '@angular/forms';
import { IUser } from '../interface';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpDataServiceService } from '../http-data-service.service';

function passwordConfirmationValidator(c:AbstractControl):{[key:string]:boolean}|null // if null is returned the validator is valid
{
const pdw=c.get('pass');
const pdwCheck=c.get('confirmPass');
if (pdw.value==pdwCheck.value)
return null;
return {'match':true};
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
userForm : FormGroup
objUser: IUser
  constructor(private formBuilder : FormBuilder,private route:Router,private dataService:HttpDataServiceService) { }
  ngOnInit() {
  
  this.userForm= this.formBuilder.group(
  {
      firstName:['',[Validators.required,Validators.minLength(2)]],
      lastName:['',[Validators.required,Validators.minLength(2)]],
        email: ['',[Validators.required,Validators.email]],
        checkPasswords: this.formBuilder.group( { // here we have the 'passwords' group
         pass :['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
         confirmPass :['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
        },{validator: passwordConfirmationValidator}),
  });

  }
  btnClick()
  {
    const user ={...this.objUser,...this.userForm.value}; //copy the 
    console.warn(user);  
    if (this.userForm.dirty)
    {
      this.dataService.addUser(user).subscribe(
        () =>{this.route.navigate(['/clients'])},
        err=> console.warn(err));
    }
  }

}
