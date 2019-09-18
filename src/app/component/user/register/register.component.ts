import { Component, OnInit } from '@angular/core';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/service/users/user';
import { MyserviceService } from 'src/app/service/myservice/myservice.service';
import { ResultObject } from 'src/app/model/object-result/result-object';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { http } from 'src/app/common/http-header';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  imageSrc: any;
  imageBefore: string;
  showMedia: boolean;
  user: User[] = [];
  public Editor = ClassicEditorBuild;
  createForm: FormGroup;
  RolesFormApi: User[] = [];
  check: string;
  image: any;
 

  get UserName(): FormControl {
    return this.createForm.get('UserName') as FormControl;
  }
  get Password(): FormControl {
    return this.createForm.get('Password') as FormControl;
  }
  get CreatedDate(): FormControl {
    return this.createForm.get('CreatedDate') as FormControl;
  }
   get EditedDate(): FormControl {
    return this.createForm.get('EditedDate') as FormControl;
   }
  get FullName(): FormControl {
    return this.createForm.get('FullName') as FormControl;
  }
  get Phone(): FormControl {
    return this.createForm.get('Phone') as FormControl;
  }
  get Email(): FormControl {
    return this.createForm.get('Email') as FormControl;
  }
  get Address(): FormControl {
    return this.createForm.get('Address') as FormControl;
  }

  get Avatar(): FormControl {
    return this.createForm.get('Avatar') as FormControl;
  }
  // get Status(): FormControl {
  //   return this.createForm.get('Status') as FormControl;
  // }
 
  constructor(private myservice:MyserviceService, private router: Router, private fb: FormBuilder,
     private http: HttpClient,private toar:ToastrService) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
   }


  passwordPattern ="^[a-z0-9_@A-Z]*$";
  phonenumber = "^[0-9]{1,12}$";
  emailPattern = "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";
  ngOnInit() {
   
    this.createForm = this.fb.group({
      UserName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      Email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      Phone: ['', [Validators.required, Validators.pattern(this.phonenumber)]],
      Password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern(this.passwordPattern)]],
      FullName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      Address: ['', [Validators.required]],
      Status: true,
      Avatar: [''],
      CreatedDate: [''],
      RoleId:3,
      
     
    });
   
  }
  onChangeFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.showMedia = true;
      this.image = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => (this.imageSrc = reader.result);
      reader.readAsDataURL(this.image);
    } else {
      this.imageSrc = '';
    }
  }
  
  onSubmit(userName) {

   
    if (this.createForm.valid) {
      const value = this.createForm.value;
   

      this.http.get<string>('http://localhost:65170/api/User/?userName=' + userName,httpOptions).subscribe(res => {
        this.check = res;
       
        if (this.check == 'False') {
          //debugger;
          this.http.post<string>('http://localhost:65170/api/user', JSON.stringify(value),httpOptions ).subscribe({
            next: (res) => {
              const result: ResultObject = JSON.parse(res);
              if (result.Success >= 1) {
                this.toar.success('success',' Create User');
                this.router.navigate(['/login']);
              } else {
                this.toar.warning('false',' Create User');
              }
              this.createForm.reset();
            },
            error: (err) => {
              console.log(err);
            }
          });
        }
        else {
          this.toar.warning('User name is exist');
        }
      });
      }
  }


  validateForm() {
    if (this.createForm.invalid) {
      this.createForm.get('UserName').markAsTouched();
      this.createForm.get('FullName').markAsTouched();
      this.createForm.get('Email').markAsTouched();
      this.createForm.get('Address').markAsTouched();
      this.createForm.get('Phone').markAsTouched();
      this.createForm.get('Password').markAsTouched();
    
      
      return;
    }
  }

}
