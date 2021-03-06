import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { PopupModule } from 'ng2-opd-popup';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Http } from '@angular/http';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,MatTableModule,
  MatPaginatorModule,
  MatTreeModule,
  MatIconModule,
  MatSortModule
} from '@angular/material';

import { CheckRolePermissionOrMenu } from './common/checkRolePermissionOrMenu';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TooltipModule } from 'ngx-bootstrap';
import { NotifierModule } from 'angular-notifier';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TemplateComponent } from './component/user/template/template.component';
import { ErrorPageComponent } from './component/user/error-page/error-page.component';
import { LoginComponent } from './component/user/login/login.component';
import { CmsModule } from './component/admin/cms/cms.module';
import { TruncateModule } from 'ng2-truncate';
import { TemplateModule } from './component/user/template/template.module';
import { RegisterComponent } from './component/user/register/register.component';
// export function authHttpServiceFactory(http: Http) {
//   return new AuthHttp(
//     new AuthConfig({
//       headerPrefix: 'Bearer',
//       tokenName: TOKEN_NAME,
//       globalHeaders: [{ 'Content-Type': 'application/json' }],
//       noJwtError: false,
//       noTokenScheme: true,
//       tokenGetter: () => localStorage.getItem(TOKEN_NAME)
//     }),
//     http
//   );
// }
// export function tokenGetter() {
//   return localStorage.getItem('access_token');
// }
const routes: Routes = [
  {
    path: 'template',
    component: TemplateComponent,
  },
 
  {
    path: '',
    redirectTo: '/template/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];
@NgModule({
  exports: [

    MatTooltipModule,

  ],
  entryComponents: [],
  declarations: [
    AppComponent
    
    // ProductComponent,
    
  
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CmsModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    TooltipModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
       
      }
    }),
    NgxPaginationModule,
    PopupModule,
    MatPaginatorModule,
    MatTreeModule,
    MatIconModule,
    MatTableModule,
    DragDropModule,
    MatSortModule,
    NgMultiSelectDropDownModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    TruncateModule,
    MatDialogModule,
    PdfViewerModule,
    AngularEditorModule,
    TemplateModule,
    
    NotifierModule.withConfig({
      position: {
        horizontal: {
          /*
           //* Defines the horizontal position on the screen
           * @type {'left' | 'middle' | 'right'}
           */
          position: 'right',

          /**
           * Defines the horizontal distance to the screen edge (in px)
           //* @type {number}
           */
          distance: 20
        },

        vertical: {
          /**
           * Defines the vertical position on the screen
           //* @type {'top' | 'bottom'}
           */
          position: 'top',

          /**
           * Defines the vertical distance to the screen edge (in px)
           // * @type {number}
           */
          distance: 150,

          /**
           * Defines the vertical gap, existing between multiple notifications (in px)
           //* @type {number}
           */
          gap: 10
        }
      },
      behaviour: {
        /**
         * Defines whether each notification will hide itself automatically after a timeout passes
         //* @type {number | false}
         */
        autoHide: 3000,

        /**
         * Defines what happens when someone clicks on a notification
         //* @type {'hide' | false}
         */
        onClick: 'hide',

        /**
         * Defines what happens when someone hovers over a notification
         //* @type {'pauseAutoHide' | 'resetAutoHide' | false}
         */
        onMouseover: 'pauseAutoHide',

        /**
         * Defines whether the dismiss button is visible or not
         //* @type {boolean}
         */
        showDismissButton: true,

        /**
         * Defines whether multiple notification will be stacked, and how high the stack limit is
         //* @type {number | false}
         */
        stacking: 4
      }
    })

  ],
  providers: [
    { provide: AuthHttp, deps: [Http] },
    JwtHelperService,
    CheckRolePermissionOrMenu,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
