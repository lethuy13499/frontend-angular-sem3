import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';

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
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
  }
  ngDoCheck(){
    if (sessionStorage.getItem('user')) {
      this.Users = sessionStorage.getItem('user');
      this.LisUser = this.Users.split(',');
      this.UserName = this.LisUser[1];
      this.UserId = this.LisUser[0];
     
     
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
