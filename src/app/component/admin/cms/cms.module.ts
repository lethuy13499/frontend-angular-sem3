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
import { ProductComponent } from '../product/product.component';
import { SliderComponent } from '../slider/slider.component';
import { LoginComponent } from '../../user/login/login.component';
import { CreateProductComponent } from '../create-product/create-product.component';
import { CreateSliderComponent } from '../create-slider/create-slider.component';


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
        {
          path:'product',
          component:ProductComponent
        },
        {
          path:'slider',
          component:SliderComponent
        },
        {
          path:'product/create',
          component:CreateProductComponent
        },
        {
          path:'slider/create',
          component:CreateSliderComponent
        }

  
        
    


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
    ProductComponent,
    SliderComponent,
    CreateProductComponent,
    CreateSliderComponent
 
 
  
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
