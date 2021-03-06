import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable ,throwError } from 'rxjs';

import { IClient ,ICammande, IProduct, IUser} from './interface';
import { map, catchError } from 'rxjs/operators';
const headers= new HttpHeaders().set("Access-Control-Allow-Origin","*");

@Injectable({
  providedIn: 'root'
})
export class HttpDataServiceService {
  baseUrl: string = 'http://localhost:8088/api/clients';
  userBaseUrl:string = 'http://localhost:8088/register';
loginUrl:string = 'http://localhost:8088/login';
  strUrl:string;
  constructor(private http: HttpClient)
  {

  }
  loggedIn():boolean{
    return !!localStorage.getItem("token"); // !! converts string to bolean 
    }
    logIn(user:IUser):Observable<IUser>{

      this.strUrl=this.loginUrl;
      return this.http.post<IUser>(this.strUrl,user);
    }
getClients(): Observable<IClient[]> 
  {
    return this.http.get<IClient[]>(this.baseUrl);
  }

editClient(client:IClient,id:number): Observable<IClient>
{
  this.strUrl = this.baseUrl+'/'+id; 
return this.http.put<IClient>(this.strUrl,client);
}
addClient(client:IClient): Observable<IClient>

{
  this.strUrl = this.baseUrl;
  return this.http.post<IClient>(this.strUrl,client,{headers});

}
  /*
    .pipe(
      map((clients: IClient[]) => {
        return clients;
        }),
        catchError(this.handleError)
      );
  */
 /*
  getClient(Id: number): Observable<IClient> {
    return this.getClients().pipe(
      map((clients: IClient[]) => clients.find(c => c.id == Id)));
   
  }*/
  addUser(user:IUser): Observable<IUser>

{
  this.strUrl = this.userBaseUrl;
  return this.http.post<IUser>(this.strUrl,user);

}

  getClient(Id: number): Observable<ICammande[]> 
{
    this.strUrl = this.baseUrl+'/'+Id; 
    console.warn(this.strUrl);
  return this.http.get<ICammande[]>(this.strUrl);
}


  getProduct(IdClient: number, idCOmmand: number): Observable<IProduct[]> {
    this.strUrl = this.baseUrl+'/'+IdClient+'/'+idCOmmand; 
    console.warn(this.strUrl);
  return this.http.get<IProduct[]>(this.strUrl);}

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    
    return throwError(errorMessage);
  }

}