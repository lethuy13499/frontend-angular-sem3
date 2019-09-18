import { Component, OnInit } from '@angular/core';
import { http } from 'src/app/service/http-header';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MyserviceService } from 'src/app/service/myservice/myservice.service';
import { Category } from 'src/app/model/category/category';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
listCategorys:Category[]=[];
  constructor(private http: HttpClient,private myservice:MyserviceService,
    private router: Router) { }

  ngOnInit() {
  }
  listCategory() {
    this.http.get<string>('http://localhost:65170/api/Categoty',{ headers: http() }).subscribe(value => {
    this.listCategorys=JSON.parse(value);
    console.log(this.listCategorys)
    });
  }

}
