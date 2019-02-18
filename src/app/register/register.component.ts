import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup,Validators, AbstractControl } from '@angular/forms';

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
  constructor(private formBuilder : FormBuilder) { }

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

}
