import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/model/product/product';
import { MyserviceService } from 'src/app/service/myservice/myservice.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ResultObject } from 'src/app/model/object-result/result-object';
import { http } from 'src/app/service/http-header';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  product: Product[] = [];
  createForm: FormGroup;
  CategoryFormApi:Product[]=[];
  Users: string;
  LisUser;
  UserId: string;
  UserName: string;
  get ProductName(): FormControl {
    return this.createForm.get('ProductName') as FormControl;
  }
  get Description(): FormControl {
    return this.createForm.get('Description') as FormControl;
  }
  get CreatedDate(): FormControl {
    return this.createForm.get('CreatedDate') as FormControl;
  }
  get Image(): FormControl {
    return this.createForm.get('Image') as FormControl;
  }
  get Status(): FormControl {
    return this.createForm.get('Status') as FormControl;
  }
  get Quantity(): FormControl {
    return this.createForm.get('Quantity') as FormControl;
  }
  get Price(): FormControl {
    return this.createForm.get('Price') as FormControl;
  }
  get Size(): FormControl {
    return this.createForm.get('Size') as FormControl;
  }
  get CreateBy(): FormControl {
    return this.createForm.get('CreateBy') as FormControl;
  }
  get CategoryId(): FormControl {
    return this.createForm.get('CategoryId') as FormControl;
  }
  get Categorys(): FormGroup {
    return this.createForm.get('Categorys') as FormGroup;
  }
  get CategoryName(): FormControl {
    return this.createForm.get('CategoryName') as FormControl;
  }
  constructor(private myservice:MyserviceService, 
    private router: Router, private fb: FormBuilder,
     private http: HttpClient,private toar:ToastrService) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
   }
   getApiCategory() {
    this.http.get<string>('http://localhost:65170/api/Categoty/',{ headers: http() }).subscribe(value => {
      this.CategoryFormApi = JSON.parse(value);
      console.log(this.CategoryFormApi)
    });
  }
  quantity = "[0-9][0-9]";
  price='[0-9]+(\\.[0-9][0-9]?)?';
  ngOnInit() {
    this.getApiCategory();
    this.createForm = this.fb.group({
      ProductName:['',[Validators.required]],
      Description:['',[Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      CreatedDate:[''],
      Image:['',[Validators.required]],
      Status:['',[Validators.required]],
      Quantity:['',[Validators.required,Validators.pattern(this.quantity)]],
      Price:['',[Validators.required,Validators.pattern(this.price)]],
      CreateBy:['',[Validators.required]],
      Categorys:this.fb.group({
        CategoryId:['',[Validators.required]],
      })

     

    })
    this.Users = sessionStorage.getItem('user');
    this.LisUser = this.Users.split(',');
    this.UserName = this.LisUser[1];
    this.UserId = this.LisUser[0];
  }
  onSubmit(){
    console.log(this.createForm.value);
    if (this.createForm.valid) {
      const value = this.createForm.value;
      value.Categorys = this.CategoryFormApi.filter(s => s.CategoryId == value.Categorys.CategoryId);
      value.Category = value.Categorys.length > 0 ? value.Categorys[0] : null;
      value.CategoryId = value.Category.CategoryId;
      console.log(value);  
          this.http.post<string>('http://localhost:65170/api/Products', JSON.stringify(value), { headers: http() }).subscribe({
            next: (res) => {
              const result: ResultObject = JSON.parse(res);
              if (result.Success >= 1) {
                this.toar.success('success',' Create Product');
                this.router.navigate(['/cms/product']);
              } else {
                this.toar.warning('false',' Create Product');
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
          this.createForm.get('ProductName').markAsTouched();
          this.createForm.get('Description').markAsTouched();
          this.createForm.get('Image').markAsTouched();
          this.createForm.get('Quantity').markAsTouched();
          this.createForm.get('Price').markAsTouched();
          this.createForm.get('CreateBy').markAsTouched();
          this.createForm.get('Categorys.CategoryId').markAsTouched();
          this.createForm.get('Status').markAsTouched();
          
          return;
        }
      }
  }


