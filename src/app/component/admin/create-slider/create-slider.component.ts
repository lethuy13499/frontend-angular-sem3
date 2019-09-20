import { Component, OnInit } from '@angular/core';
import { Slider } from 'src/app/model/slider/slider';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MyserviceService } from 'src/app/service/myservice/myservice.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { http } from 'src/app/common/http-header';
import { ResultObject } from 'src/app/model/object-result/result-object';

@Component({
  selector: 'app-create-slider',
  templateUrl: './create-slider.component.html',
  styleUrls: ['./create-slider.component.scss']
})
export class CreateSliderComponent implements OnInit {
slider:Slider[]=[];
createForm: FormGroup;
Users: string;
LisUser;
UserId: string;
UserName: string;

get SliderName(): FormControl {
  return this.createForm.get('SliderName') as FormControl;
}
get Slogan(): FormControl {
  return this.createForm.get('Slogan') as FormControl;
}
get Image(): FormControl {
  return this.createForm.get('Image') as FormControl;
}
get CreateBy(): FormControl {
  return this.createForm.get('CreateBy') as FormControl;
}
constructor(private myservice:MyserviceService,
   private router: Router,
   private fb: FormBuilder, 
   private http: HttpClient,
   private toastr:ToastrService) {
  this.router.events.subscribe((event) => {
    this.myservice.changeMessage('1');
 });
 }

  ngOnInit() {
    this.createForm = this.fb.group({
      SliderName:['',[Validators.required]],
      Slogan:['',[Validators.required]],
      Image:['',[Validators.required]],
      CreateBy:['']
    })
    this.Users = sessionStorage.getItem('user');
    this.LisUser = this.Users.split(',');
    this.UserName = this.LisUser[1];
    this.UserId = this.LisUser[0];
  }
  listCategory(){
    this.http.get<string>('http://localhost:65170/api/Sliders',{ headers: http() }).subscribe(value => {
      
      
    });
  }
  onSubmit() {
    console.log(this.createForm.value);

    if (this.createForm.valid) {
      const value = this.createForm.value;
      value.CreateBy = this.UserName;
      console.log(value);
      this.http.post<string>('http://localhost:65170/api/Sliders', JSON.stringify(value), 
      { headers: http() }).subscribe({
        next: (res) => {
          const result: ResultObject = JSON.parse(res);
          if (result.Success >= 1) {
            this.toastr.success('Create success!', '');
         this.listCategory();
            this.router.navigate(['/cms/slider']);
          } else {
            this.toastr.success('Create fail !', '');
          }
          this.createForm.reset();
          
        },
        error: (err) => {
          console.log(err);
        }
      });

    }
  }
        
        validateForm() {
          if (this.createForm.invalid) {
            this.createForm.get('SliderName').markAsTouched();
            this.createForm.get('Slogan').markAsTouched();
            this.createForm.get('Image').markAsTouched();
            this.createForm.get('CreateBy').markAsTouched();
            return;
          }
        }
      
      }
