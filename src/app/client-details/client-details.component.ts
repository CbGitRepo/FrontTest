import { Component, OnInit } from '@angular/core';
import { IClient, ICammande } from '../interface';
import { HttpDataServiceService } from '../http-data-service.service';
import {  ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  objClientId: number;
  commandes: ICammande[];
 
  constructor(private dataService: HttpDataServiceService, private router: Router, private route: ActivatedRoute)
  {

  }
  displayedColumns: string[] = ['Id', 'Quantity', 'Price', 'Products'];
  dataSource = new MatTableDataSource(this.commandes);
  ngOnInit()
  {
    
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.dataService.getClient(id).subscribe((c: ICammande[]) =>{
        console.warn(c);
        this.commandes = c;
        this.dataSource = new MatTableDataSource(this.commandes);
        this.objClientId=id;
      }, (error: any) => console.log(error));
        
    }
    this.dataSource = new MatTableDataSource(this.commandes);


  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  OnBack() : void
  {
    this.router.navigate(['/clients']);
  }
}
