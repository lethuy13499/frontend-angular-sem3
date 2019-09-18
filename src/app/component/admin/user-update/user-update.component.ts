import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/users';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MyserviceService } from 'src/app/service/myservice/myservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { http } from 'src/app/service/http-header';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {
  user: User[] = [];
  editform: FormGroup;
  RolesFormApi: User[] = [];
  rolename: string;
  constructor(private myservice:MyserviceService,
     private router: Router, private fb: FormBuilder,
      private http: HttpClient, private ac: ActivatedRoute,
      private toar:ToastrService) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
   }

  get UserName(): FormControl {
    return this.editform.get('UserName') as FormControl;
  }
  get Password(): FormControl {
    return this.editform.get('Password') as FormControl;
  }
  get Roles(): FormGroup {
    return this.editform.get('Roles') as FormGroup;
  }
  get RoleId(): FormControl {
    return this.editform.get('RoleId') as FormControl;
  }
  get CreatedDate(): FormControl {
    return this.editform.get('CreatedDate') as FormControl;
  }
  get EditedDate(): FormControl {
    return this.editform.get('EditedDate') as FormControl;
  }
  get FullName(): FormControl {
    return this.editform.get('FullName') as FormControl;
  }
  get Phone(): FormControl {
    return this.editform.get('Phone') as FormControl;
  }
  get Email(): FormControl {
    return this.editform.get('Email') as FormControl;
  }
  get Address(): FormControl {
    return this.editform.get('Address') as FormControl;
  }
  get Avatar(): FormControl {
    return this.editform.get('Avatar') as FormControl;
  }
  get Status(): FormControl {
    return this.editform.get('Status') as FormControl;
  }

  getApiRoles() {
    this.http.get<string>('http://localhost:65170/api/role/',{ headers: http() }).subscribe(value => {
      this.RolesFormApi = JSON.parse(value);
    });
  }
  passwordPattern ="^[a-z0-9_@A-Z]*$";
  phonenumber = "^[0-9]{1,12}$";
  emailPattern = "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";
  ngOnInit() {
    this.getApiRoles();
    this.editform = this.fb.group({
      UserName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      Email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      Phone: ['', [Validators.required, Validators.pattern]],
      Password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100),Validators.pattern(this.passwordPattern)]],
      FullName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      Address: ['', [Validators.required]],
      RoleId: [''],
      Status: [''],
      Avatar: [''],
      CreatedDate: [''],
      EditedDate: [''],
     
    });
    const userId = this.ac.snapshot.paramMap.get('Id');
    this.http.get<string>('http://localhost:65170/api/User/?idUser=' + userId,{ headers: http() }).subscribe(value => {
      this.rolename = value;
    });
    this.http.get<string>('http://localhost:65170/api/User/?userid=' + userId,{ headers: http() }).subscribe(value => {
      this.user = JSON.parse(value);
      this.editform.patchValue(JSON.parse(value));
    });

  }
  onSubmit(userName) {
    const value = this.editform.value;
    if (this.editform.valid) {
      const formData = {
        ...this.user,
        ...value
      };

      let temp = this.RolesFormApi.filter(s => s.RoleId == value.RoleId);
      value.Role = temp.length > 0 ? temp[0] : null;
      console.log(value);
      this.http.put('http://localhost:65170/api/User/' + formData.UserId, formData, { headers: http() }).subscribe({
        next: (res) => {
          console.log(res);
          this.toar.success('success', 'Update User');
          this.router.navigate(['/cms/user']);
        },
        error: (err) => {
          console.log(err);
          this.toar.warning('Fail', 'Update User');
        }
      });
    }
  }
validateForm() {
  if (this.editform.invalid) {
    this.editform.get('UserName').markAsTouched();
    this.editform.get('FullName').markAsTouched();
    this.editform.get('Email').markAsTouched();
    this.editform.get('Address').markAsTouched();
    this.editform.get('Phone').markAsTouched();
    this.editform.get('Password').markAsTouched();
    this.editform.get('RoleId').markAsTouched();
    return;
  }
}

}
