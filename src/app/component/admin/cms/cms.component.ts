import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';
import { User } from 'src/app/model/user/users';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  isMember = false;
  isManager = false;
  isAdmin = false;
  Users: string;
  LisUser;
  UserId: string;
  UserName: string;
  Avatar:string;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    // this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
    //   this.currentUser = JSON.parse(user);
    // });
    // if (this.currentUser.RoleId == '1') {
    //   this.isAdmin = true;
    // }
    // if (this.currentUser.RoleId == '2') {
    //   this.isManager = true;
    // }
    // if (this.currentUser.RoleId == '3') {
    //   this.isMember = true;
    // }
  }
  ngDoCheck(){
    if (sessionStorage.getItem('user')) {
      this.Users = sessionStorage.getItem('user');
      this.LisUser = this.Users.split(',');
      this.UserName = this.LisUser[1];
      this.UserId = this.LisUser[0];
      this.Avatar=this.LisUser[2];

     
     
    } else {
      this.Users = null;
    }
  }
  logout() {
    sessionStorage.removeItem('currentPermission');
    this.router.navigate(['']);
    sessionStorage.removeItem('user');
  }

}
