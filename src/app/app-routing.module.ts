import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ClientComponent } from './client/client.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { CommandDetailsComponent } from './command-details/command-details.component';
import { AddClientComponent } from './add-client/add-client.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationGuard } from './authentication.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = 
[
{path:'home' ,component:ClientComponent, canActivate:[AuthenticationGuard]},
{path:'register' ,component:RegisterComponent},
{path:'login' ,component:LoginComponent},
{path:'clients' ,component:ClientComponent},
{path:'clients/:id' ,component:ClientDetailsComponent},
{path:'clients/:idClient/:id' ,component:CommandDetailsComponent},
{path:'about' ,component:AboutComponent},
{path:'contact' ,component:ContactComponent},
{path:'Update/:id' ,component:AddClientComponent},
{path:'' ,component:ClientComponent},
{path:'**' ,component:ClientComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
