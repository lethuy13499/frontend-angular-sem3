import { Component, OnInit, ViewChild } from '@angular/core';
import { MyserviceService } from 'src/app/service/myservice/myservice.service';
import { Product } from 'src/app/model/product/product';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { http } from 'src/app/common/http-header';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product:Product[]=[];

  getProduct:Product;
  products:Product;
  CategoryId:'';
  ProductId:'';
  Users: string;
  LisUser;
  UserId: string;
  UserName: string;
  constructor(private myservice:MyserviceService, 
    private http: HttpClient, 
    private router: Router, 
    private fb: FormBuilder,private toastr:ToastrService) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
   }
   displayedColumn: string[] = ['ProductName','Image', 'Description', 'Status', 'CreateBy', 'Action'];
   dataSource = new MatTableDataSource<Product>(this.product);
   selection = new SelectionModel<Product>(true, []);
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
   
  


  ngOnInit() {
    
    this.http.get<string>('http://localhost:65170/api/Products',{ headers: http() }).subscribe(value => {
      this.dataSource.data = JSON.parse(value);
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
    });
  }
  getId(id){
    this.ProductId=id
  }
  DeleteProduct(Id: string){
    if (confirm('Are you sure you to delete this product?')) {
      this.http.delete<string>('http://localhost:65170/api/Products/?id=' + Id,{ headers: http() }).subscribe(res => {
        let result = JSON.parse(res);
        if (result.Success == 1) {
          this.product = this.product.filter(b => b.ProductId !== Id);
          this.toastr.success('Delete success!', '');
          
        } else {
          this.toastr.error('Delete success!', '');
        }
      });
    }
  }

}
