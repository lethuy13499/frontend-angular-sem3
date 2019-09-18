import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { RoleActionAdd } from 'src/app/model/add-role-action/role-action-add';
import { MyserviceService } from 'src/app/service/myservice/myservice.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ResultObject } from 'src/app/model/object-result/result-object';
import { http } from 'src/app/service/http-header';

@Component({
  selector: 'app-create-role-action',
  templateUrl: './create-role-action.component.html',
  styleUrls: ['./create-role-action.component.scss']
})
export class CreateRoleActionComponent implements OnInit {
  roleactionadds: RoleActionAdd[] = [];
  roleactionadd: RoleActionAdd = undefined;
  actionId = '';
  check: string;
  ObjFormGroup: FormGroup;
  roleId: string;
  get RoleName(): FormControl {
    return this.ObjFormGroup.get('RoleName') as FormControl;
  }
  constructor(private fb: FormBuilder,
    private myservice:MyserviceService, 
    private http: HttpClient,
     private router: Router, 
     private activatedRoute: ActivatedRoute,
     private toastr: ToastrService) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
  }
  displayedColumn: string[] = [ 'ActionName', 'Description', 'Action'];
  dataSource = new MatTableDataSource<RoleActionAdd>(this.roleactionadds);
  selection = new SelectionModel<RoleActionAdd>(true, [])
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    const RoleId = this.activatedRoute.snapshot.paramMap.get('RoleId');
    console.log(RoleId);
    this.http.get<string>('http://localhost:65170/api/RoleAction/?idRole=' + RoleId,{ headers: http() }).subscribe(value => {
      this.dataSource.data = JSON.parse(value).Data;
      console.log(this.roleactionadds);
      this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort;
    });
  }
  clickToGoBack() {
    const RoleId = this.activatedRoute.snapshot.paramMap.get('RoleId');
    this.router.navigate(['cms/role/', RoleId]);
  }

  AddActionToRole(actionId) {
    if (confirm('Are you sure you to add this action?')) {
      const RoleId = this.activatedRoute.snapshot.paramMap.get('RoleId');
      console.log(this.actionId);
      console.log(RoleId);
      var arr={ ActionId:actionId,roleId:RoleId};
      //  this.dataSource.data.splice(index,1);
      this.http.post<string>('http://localhost:65170/api/RoleAction/',JSON.stringify(arr), { headers: http() }).subscribe(
          value => {
            const result: ResultObject = JSON.parse(value);
            if (result.Success >= 1) {
              this.toastr.success('Create success !', '');
              this.http.get<string>('http://localhost:65170/api/RoleAction/?idRole=' + RoleId,{ headers: http() }).subscribe(value => {
                this.dataSource.data = JSON.parse(value).Data;
                console.log(this.roleactionadds);
                this.dataSource = new MatTableDataSource<RoleActionAdd>(this.dataSource.data);
                this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort;
              });
            } else {
              this.toastr.success('Create fail !', '');
            }

          }
        );
      
    }

  }
}
