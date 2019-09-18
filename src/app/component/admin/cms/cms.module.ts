import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsComponent } from './cms.component';
import { RoleComponent } from '../role/role.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopupModule } from 'ng2-opd-popup';
import { NgxPaginationModule } from 'ngx-pagination';
import { Routes, PreloadAllModules } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TruncateModule } from 'ng2-truncate';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatButtonModule,
  MatFormFieldModule,
  MatRippleModule,
  MatSelectModule,
  MatCheckboxModule
} from '@angular/material';
import { UserComponent } from '../user/user.component';
import { RoleActionComponent } from '../role-action/role-action.component';
import { CreateRoleActionComponent } from '../create-role-action/create-role-action.component';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UserUpdateComponent } from '../user-update/user-update.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CKEditorModule} from 'ng2-ckeditor';
import { ActionComponent } from '../action/action.component';
import { CategoryComponent } from '../category/category.component';


const routes: Routes = [
  {
    path: 'cms',
    component: CmsComponent,
    children: [

      {
        path: 'role',
        component:RoleComponent ,
      },
     
        {
          path:'role/:RoleId',
          component:RoleActionComponent

        },
        {
          path:'RoleActionAdd/:RoleId',
          component:CreateRoleActionComponent
        },
        {
          path:'roleAction/:RoleId',
          component:RoleActionComponent
        },
        {
          path:'user',
          component:UserComponent
        },
        {
          path:'user/create',
          component:UserCreateComponent
        },
        {
          path:'user/update/:Id',
          component:UserUpdateComponent
        },
        {
          path:'category',
          component:CategoryComponent
        },
  
        



        ]
      }
    ]


@NgModule({
  declarations: [CmsComponent,
    RoleComponent,
    RoleActionComponent,
    UserComponent,
    UserCreateComponent,
    UserUpdateComponent,
    CreateRoleActionComponent,
    ActionComponent,
    CategoryComponent,
  
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    CKEditorModule,
    ReactiveFormsModule,
    TruncateModule,
    NgxPaginationModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    NgbModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    PopupModule.forRoot(),
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CmsModule { }
