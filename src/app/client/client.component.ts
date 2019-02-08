import { Component, OnInit } from '@angular/core';
import { IClient } from '../interface';
import { HttpDataServiceService } from '../http-data-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  title: string;
  clients: IClient[] = [];
  filteredClients: IClient[] = [];
  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredClients = this.listFilter ? this.performFilter(this.listFilter) : this.clients;
  }
  totalRecords: number = 0;
  pageSize: number = 10;

  constructor(
    private dataService: HttpDataServiceService, private router: Router) { }
  displayedColumns: string[] = ['First Name', 'Last Name', 'Email', 'Address', 'Gender', 'Command','Update'];
  dataSource = new MatTableDataSource(this.clients);


  performFilter(filterBy: string): IClient[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.clients.filter((client: IClient) =>
      client.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }



  ngOnInit() {
    this.title = 'Customers';
    this.getCustomers();


  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  btnClick() {

    this.router.navigate(['Update/1']);
  }
  getCustomers() {
    this.dataService.getClients().subscribe((clients: IClient[]) => {
      console.warn(clients);
      this.clients = clients;
      this.filteredClients = clients;
      this.dataSource = new MatTableDataSource(this.clients);

    }, (error: any) => console.log(error));
  }
}
