import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateFormatter } from 'ngx-bootstrap';
import { formatDate } from "@angular/common";
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Testing System Online';
  rememberMe: string;
  	// ngo minh anh update timeout
  date : Date = new Date();
  userLogin = {
    id: 0,
    fullname: '',
    email: '',
    phone: '',
    address: '',
    birthday: '',
    img: '',
    status: 0
  };
  role: boolean;
  	// ngo minh anh update timeout
  constructor(
              private router: Router,
              
              private http: HttpClient) {}
  ngOnInit() {
   
    
  	// ngo minh anh update timeout
}
}