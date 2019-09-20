import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/model/category/category';
import { MyserviceService } from 'src/app/service/myservice/myservice.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { http } from 'src/app/service/http-header';
import { ResultObject } from 'src/app/model/object-result/result-object';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
category:Category[]=[];
getCategory:Category;
categorys:Category;
CategoryId: '';
Users: string;
LisUser;
UserId: string;
UserName: string;
constructor(private myservice:MyserviceService, 
  private http: HttpClient, 
  private router: Router, 
  private fb: FormBuilder,private toastr:ToastrService) {
  this.router.events.subscribe((event) => {
    this.myservice.changeMessage('1');
 });
 }
 displayedColumn: string[] = ['CategoryName', 'Description', 'Status', 'CreateBy', 'Action'];
   dataSource = new MatTableDataSource<Category>(this.category);
   selection = new SelectionModel<Category>(true, []);
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
   createForm: FormGroup;
   get CategoryName(): FormControl {
    return this.createForm.get('CategoryName') as FormControl;
  }
  get Description(): FormControl {
    return this.createForm.get('Description') as FormControl;
  }

  get CreateBy(): FormControl {
    return this.createForm.get('CreateBy') as FormControl;
  }


  ngOnInit() {
   this.listCategory();
    this.createForm = this.fb.group({
      CategoryName: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      Description :[''],
      Status:true,
      CreateBy:['']
    });

      this.Users = sessionStorage.getItem('user');
      this.LisUser = this.Users.split(',');
      this.UserName = this.LisUser[1];
      this.UserId = this.LisUser[0];
  
}
listCategory(){
  this.http.get<string>('http://localhost:65170/api/Categoty',{ headers: http() }).subscribe(value => {
    this.dataSource.data = JSON.parse(value);
    
  });
}
  DeleteCategory(Id: string) {
    if (confirm('Are you sure you to delete this category?')) {
      this.http.delete<string>('http://localhost:65170/api/Categoty/?id=' + Id,{ headers: http() }).subscribe(res => {
        let result = JSON.parse(res);
        if (result.Success == 1) {
          this.category = this.category.filter(b => b.CategoryId !== Id);
          this.toastr.success('Delete success!', '');
          this.router.navigate(['/cms/category']);
        } else {
          this.toastr.error('Delete fail!', '');
        }
      });
    }
  }
  onSubmit() {
    console.log(this.createForm.value);

    if (this.createForm.valid) {
      
      const value = this.createForm.value;
      value.CreateBy = this.UserName;
      console.log(value);
      this.http.post<string>('http://localhost:65170/api/Categoty', JSON.stringify(value), { headers: http() }).subscribe({
        next: (res) => {
          const result: ResultObject = JSON.parse(res);
          if (result.Success >= 1) {
            this.toastr.success('Create success!', '');
            this.listCategory();
            this.router.navigate(['/cms/category']);
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
      this.createForm.get('CategoryName').markAsTouched();
      this.createForm.get('Description').markAsTouched();
      this.createForm.get('CreateBy').markAsTouched();
      return;
    }

}

}
