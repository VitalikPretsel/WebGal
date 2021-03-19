import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service'
import { Router } from '@angular/router';
//import { CommonModule } from '@angular/common';
//import { BrowserModule } from '@angular/platform-browser';

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
    this.isAuth = this.service.isAuthenticatedJwt(); //.subscribe((data:boolean) => this.isAuth = data);
  }
  getCurrentUserName() {
    this.userName = this.service.getCurrentUserNameJwt(); //.subscribe((data:string) => this.userName = data);
  }

  logout() {
    this.service.logoutJwt();
    this.router.navigate(["/"]).then(() => {
      window.location.reload();
    });
  }
}
