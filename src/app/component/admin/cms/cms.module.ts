import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsComponent } from './cms.component';
import { RoleComponent } from '../role/role.component';
import { RouterModule } from '@angular/router';
import { Routes, PreloadAllModules } from '@angular/router';
const routes: Routes = [
  {
    path: 'cms',
    component: CmsComponent,
    // canActivate: [AuthGuard],
    children: [

      {
        path: 'role',
        component:RoleComponent ,
        children: [
          {
            path: '',
            redirectTo: 'cms',
            pathMatch: 'full'
          }
        ]
      }
    ]
  }
]


@NgModule({
  declarations: [CmsComponent],
  imports: [
    CommonModule
  ]
})
export class CmsModule { }
