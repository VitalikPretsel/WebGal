import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  isAuth:boolean;
  userName:string;

  constructor(private service:SharedService) { }

  ngOnInit(): void {
  	this.isAuthenticated();
  	this.getCurrentUserName();
  }

  isAuthenticated(){
  	this.isAuth = this.service.isAuthenticatedJwt(); //.subscribe((data:boolean) => this.isAuth = data);
  }
  getCurrentUserName(){
  	this.userName = this.service.getCurrentUserNameJwt(); //.subscribe((data:string) => this.userName = data);
  }
}