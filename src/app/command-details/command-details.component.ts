import { Component, OnInit } from '@angular/core';
import { IProduct, ICammande } from '../interface';
import { HttpDataServiceService } from '../http-data-service.service';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-command-details',
  templateUrl: './command-details.component.html',
  styleUrls: ['./command-details.component.css']
})
export class CommandDetailsComponent implements OnInit {

  objCommandId: number;
  products: IProduct[];
  dataSource = new MatTableDataSource(this.products);

  constructor(private dataService: HttpDataServiceService, private router: Router, private route: ActivatedRoute) {

  }
  displayedColumns: string[] = ['Id', 'Category', 'Name', 'Description', 'Price'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    console.warn(this.route.snapshot.params.idClient);
    const paramclient = this.route.snapshot.params.idClient;
    const paramcommand = this.route.snapshot.params.id;

      this.dataService.getProduct(paramclient,paramcommand).subscribe((c: IProduct[]) => {
        console.warn(c);
         this.products = c;
         this.dataSource = new MatTableDataSource(this.products);
        this.objCommandId = paramcommand;
      }, (error: any) => console.log(error));

    }
  
    btnClick() {
      this.router.navigate(['/addClient']);
    }

  OnBack(): void {
    this.router.navigate(['/clients']);
  }
}
