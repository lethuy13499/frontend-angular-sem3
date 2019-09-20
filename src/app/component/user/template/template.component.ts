import { Component, OnInit } from '@angular/core';
import { http } from 'src/app/service/http-header';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MyserviceService } from 'src/app/service/myservice/myservice.service';
import { Category } from 'src/app/model/category/category';
import { Slider } from 'src/app/model/slider/slider';
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
listSliders:Slider[]=[];
Users: string;
LisUser;
UserId: string;
UserName: string;
  constructor(private http: HttpClient,private myservice:MyserviceService,
    private router: Router) { }

  ngOnInit() {
    this.listCategory();
    this.http.get<string>('http://localhost:65170/api/Sliders',httpOptions).subscribe(value => {
      this.listSliders=JSON.parse(value);
   console.log(this.listSliders)
  });
  }
  listCategory() {
    this.http.get<string>('http://localhost:65170/api/Categoty',httpOptions).subscribe(value => {
    this.listCategorys=JSON.parse(value);
    console.log(this.listCategorys)
    });
    
  }
  ngDoCheck(){
    if (sessionStorage.getItem('user')) {
      this.Users = sessionStorage.getItem('user');
      this.LisUser = this.Users.split(',');
      this.UserName = this.LisUser[1];
      this.UserId = this.LisUser[0]; 
    } else {
      this.Users = null;
    }
  }
  logout() {
    sessionStorage.removeItem('currentPermission');
    this.router.navigate(['']);
    sessionStorage.removeItem('user');
  }


}
