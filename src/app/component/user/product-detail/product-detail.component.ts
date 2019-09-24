import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MyserviceService } from 'src/app/service/myservice/myservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/model/product/product';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
product:Product[]=[];
  constructor( private http: HttpClient,private myservice:MyserviceService, 
    private activatedRoute: ActivatedRoute,private toastr: ToastrService,private router: Router ) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
  }

  ngOnInit() {
    const ProductId = this.activatedRoute.snapshot.paramMap.get('ProductId');
    console.log(ProductId);
    this.http.get<string>('http://localhost:65170/api/Products/?id' + ProductId,httpOptions).subscribe(value => {
      this.product=JSON.parse(value);
      console.log(this.product)
    
    });

}
    }
