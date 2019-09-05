import { NgModule } from '@angular/core';
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
  MatSortModule
} from '@angular/material';

const routes: Routes = [
  {
    path: 'cms',
    component: CmsComponent,
    children: [

      {
        path: 'role',
        component:RoleComponent ,
      },
        
        ]
      }
    ]


@NgModule({
  declarations: [CmsComponent,
    RoleComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    TruncateModule,
    NgxPaginationModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    NgbModule,
    PopupModule.forRoot(),
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ]
})
export class CmsModule { }
