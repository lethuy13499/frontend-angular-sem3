import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { MyserviceService } from 'src/app/service/myservice/myservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ResultObject } from 'src/app/model/object-result/result-object';
import { http } from 'src/app/service/http-header';
import { User } from 'src/app/model/user/users';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  user: User[] = [];
  public Editor = ClassicEditorBuild;
  createForm: FormGroup;
  RolesFormApi: User[] = [];
  check: string;

  get UserName(): FormControl {
    return this.createForm.get('UserName') as FormControl;
  }
  get Password(): FormControl {
    return this.createForm.get('Password') as FormControl;
  }
  get Roles(): FormGroup {
    return this.createForm.get('Roles') as FormGroup;
  }
  get RoleId(): FormControl {
    return this.createForm.get('RoleId') as FormControl;
  }
  get RoleName(): FormControl {
    return this.createForm.get('Roles.RoleId') as FormControl;
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
  get Status(): FormControl {
    return this.createForm.get('Status') as FormControl;
  }
  
  constructor(private myservice:MyserviceService, private router: Router, private fb: FormBuilder, private http: HttpClient,private toar:ToastrService) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
   }

  getApiRoles() {
    this.http.get<string>('http://localhost:65170/api/role/',{ headers: http() }).subscribe(value => {
      this.RolesFormApi = JSON.parse(value);
      console.log(this.RolesFormApi)
    });
  }
  passwordPattern ="^[a-z0-9_@A-Z]*$";
  phonenumber = "^[0-9]{1,12}$";
  emailPattern = "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";
  ngOnInit() {
    this.getApiRoles();
    this.createForm = this.fb.group({
      UserName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      Email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      Phone: ['', [Validators.required, Validators.pattern(this.phonenumber)]],
      Password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern(this.passwordPattern)]],
      FullName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      Address: ['', [Validators.required]],
      Roles: this.fb.group({
        RoleId: ['',Validators.required],
      }),
      Status: ['',Validators.required],
      Avatar: [''],
      CreatedDate: [''],
      EditedDate: [''],
     
    });
   
  }
  
  onSubmit(userName) {
    console.log(this.createForm.value);
   
    if (this.createForm.valid) {
      const value = this.createForm.value;
      value.Roles = this.RolesFormApi.filter(s => s.RoleId == value.Roles.RoleId);
      value.Role = value.Roles.length > 0 ? value.Roles[0] : null;
      value.RoleId = value.Role.RoleId;
      console.log(value);

      this.http.get<string>('http://localhost:65170/api/User/?userName=' + userName,{ headers: http() }).subscribe(res => {
        this.check = res;
        console.log(this.check);
        if (this.check == 'False') {
          this.http.post<string>('http://localhost:65170/api/user', JSON.stringify(value), { headers: http() }).subscribe({
            next: (res) => {
              const result: ResultObject = JSON.parse(res);
              if (result.Success >= 1) {
                this.toar.success('success',' Create User');
                this.router.navigate(['/cms/user']);
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
      this.createForm.get('Roles.RoleId').markAsTouched();
      this.createForm.get('Status').markAsTouched();
      
      return;
    }
  }

}
