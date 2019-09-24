
import { TemplateComponent } from './template.component';
import { HomeComponent } from '../home/home.component';
import { CommonModule } from '@angular/common';
import { Routes, PreloadAllModules } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { TruncateModule } from 'ng2-truncate';
import { MatInputModule } from '@angular/material/input';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopupModule } from 'ng2-opd-popup';
import {
  MatPaginatorModule,
  MatTableModule,
  MatSortModule
} from '@angular/material';
import { ProductClientComponent } from '../product-client/product-client.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
const routes: Routes = [
  {
    path: 'template',
    component: TemplateComponent,
    children: [
      
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path:'product/:ProductId',
        component:ProductClientComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path:'product/:ProductId/productdetail/:ProductId',
        component:ProductDetailComponent
      },
      {
        path: '',
      redirectTo:'home',
        pathMatch: 'full'
      },
      ]
    },
  
  ];
  
@NgModule({
  declarations: [
    TemplateComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ProductClientComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    TruncateModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    NgxPaginationModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    NgbModule,
    PopupModule.forRoot(),
    SlickCarouselModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ]
})
export class TemplateModule { }
