import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MyserviceService } from 'src/app/service/myservice/myservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/model/product/product';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-product-client',
  templateUrl: './product-client.component.html',
  styleUrls: ['./product-client.component.scss']
})

export class ProductClientComponent implements OnInit {
  listProduct :Product []=[];
  constructor(private fb: FormBuilder, private http: HttpClient,private myservice:MyserviceService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,private toastr: ToastrService) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
  }

  ngOnInit() {
  
  const CategoryId = this.activatedRoute.snapshot.paramMap.get('RoleId');
    console.log(CategoryId);
    this.http.get<string>('http://localhost:65170/api/Products/?CategoryId=' + CategoryId,httpOptions).subscribe(value => {
     
    
    });
    this.http.get<string>('http://localhost:65170/api/Products',httpOptions).subscribe(value => {
      this.listProduct=JSON.parse(value);
   console.log(this.listProduct)
  });

}
}
