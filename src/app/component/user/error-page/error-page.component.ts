import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyserviceService } from 'src/app/service/myservice/myservice.service';
@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  errors: string;
  status;
  message;
  description;
  checked = true;
  constructor(private myservice: MyserviceService, private router: Router) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('2');
    });
  }
  ngOnInit() {
    console.log(this.checked)
    this.myservice.currentError.subscribe(message => this.errors = message);
    var ListErrors = this.errors.split(',');
    console.log(ListErrors);
    this.status = ListErrors[0];
    console.log(this.status)
    // console.log('sdsf'+this.message);
    if (this.status == 401) {
      this.message = ListErrors[1];
      this.description = " Contact admin to access this feature";
    } else if (this.status == 500) {
      this.message = ListErrors[1];
      this.description = " Error! An error occurred. Please try again later";
    } else if (this.status == 400) {
      this.message = ListErrors[1];
      this.description = " Something needs your attention";
    }
    else {
      this.message = ListErrors[1];
      this.description = " Error! An error occurred. Please try again later";
    }

    if (this.status != "") {
      this.checked = false
    } else {
      this.checked = true

    }
  
  }
 
}
