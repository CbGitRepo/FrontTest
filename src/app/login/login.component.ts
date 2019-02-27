import { Component, OnInit } from '@angular/core';
import { IUser } from '../interface';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpDataServiceService } from '../http-data-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder : FormBuilder,private route:Router,private dataService:HttpDataServiceService) { }
  userForm : FormGroup
  objUser: IUser
  ngOnInit() {

    this.userForm=this.formBuilder.group(
      {
        email: ['',[Validators.required,Validators.email]],
        password :['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],

      })
  }
  Login()
  {
    const user ={...this.objUser,...this.userForm.value}; //copy the 
    console.warn(user);  
    if (this.userForm.dirty)
    {
      this.dataService.logIn(user).subscribe(
        res=>{localStorage.setItem("token", res.token);
        this.route.navigate(['/home'])},
        err=> console.warn(err));
    }  }

}
