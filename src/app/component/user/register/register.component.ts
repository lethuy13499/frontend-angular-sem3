import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/model/user/users';
import { UserserviceService } from 'src/app/service/users/userservice.service';
function comparePassword(c: AbstractControl): ValidationErrors | null {
  const value = c.value;
  const { password, confirmPassword } = value;
  if (password !== confirmPassword) {
    return {
      passwordNotMatch: true
    };
  }
  return null;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
listUser:Object[] = [];
createForm:FormGroup;
user:User={
    UserId:1,
    UserName:'',
    Password:'',
    Fullname:'',
    Phone:'',
    Email:'',
    Adress:'',
    Avatar:'',
    Status:1
}
  errorExistEmail = '';
  successExistEmail = '';
  showCreateForm: Boolean = false;
  constructor(
   private userService:UserserviceService,
   private fb:FormBuilder,
     private router: Router,
    private titleService: Title

   ) { }

  ngOnInit() {
    this.CreateForm();
        
    
  
  }
  CreateForm(){
    this.createForm = this.fb.group({
      fullname: ['', [Validators.required,
         Validators.maxLength(50),
         Validators.pattern('.*\\S.*[a-zA-z0-9 ]')]],
      // tslint:disable-next-line:max-line-length
      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(
            // tslint:disable-next-line:max-line-length
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ]
      ],
      pass: this.fb.group(
        {
          // tslint:disable-next-line:max-line-length
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(100),
              Validators.pattern(/^(?!.* )(?=.*\d)(?=.*[a-z]).{6,100}$/)
            ]
          ],
          confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
        },
        {
          validator: [comparePassword]
        }
      ),
      phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.pattern(/^\d+$/)
        ]
      ]
    });
  }


onSubmitInsert() {
  this.errorExistEmail = '';
    this.successExistEmail = '';
    const { valid, value } = this.createForm;
    if (valid) {
      this.user.Fullname = this.createForm.get('fullname').value;
      this.user.Email = this.createForm.get('email').value;
      this.user.Password = this.createForm.get('pass.password').value;
      this.user.Phone = this.createForm.get('phone').value;
      const formData = new FormData();
      formData.append('user', JSON.stringify(this.user));
      this.userService.createUser(formData).subscribe(
        res=>{
          this.listUser=res;
          console.log(this.listUser)
         
        },
       
        err =>{
          this.errorExistEmail = 'Email đã tồn tại!';
        }
      )
}

}
}

