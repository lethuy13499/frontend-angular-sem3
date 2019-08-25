import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  URL = '';
  constructor(private router: Router) { }

  ngOnInit() {
    const lengh = localStorage.getItem('backURL').split('/').length;
  this.URL = localStorage.getItem('backURL').split('/')[lengh - 1]
  }
  onBack() {
    this.router.navigate(['template/home']);
    localStorage.removeItem('backURL');
  }
}
