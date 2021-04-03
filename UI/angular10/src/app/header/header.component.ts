import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  userName: string;

  constructor(private service: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.isAuthenticated();
    this.getCurrentUserName();
  }

  isAuthenticated() {
    this.isAuth = this.service.isAuthenticatedJwt(); 
  }
  getCurrentUserName() {
    this.userName = this.service.getCurrentUserNameJwt(); 
  }

  logout() {
    this.service.logoutJwt();
    this.router.navigate(["/"]).then(() => {
      window.location.reload();
    });
  }
}
