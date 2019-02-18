import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpDataServiceService } from './http-data-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  
  constructor(private dataService:HttpDataServiceService,private router:Router){}
  canActivate():boolean{
        if (this.dataService.loggedIn())
        {
          return true;
        }
        else
        {
          this.router.navigate(['/login']);
          return false;
        }   
  }
}
