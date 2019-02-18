import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { container } from '@angular/core/src/render3/instructions';
import { ContactComponent } from './contact/contact.component';
import { ClientComponent } from './client/client.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { CommandDetailsComponent } from './command-details/command-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';
import { AddClientComponent } from './add-client/add-client.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    AboutComponent,
    ContactComponent,
    ClientComponent,
    ClientDetailsComponent,
    CommandDetailsComponent,
    AddClientComponent,
    LoginComponent,
    RegisterComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,BrowserAnimationsModule,MatButtonModule, // angular materials
    ReactiveFormsModule //for reactive forms
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
