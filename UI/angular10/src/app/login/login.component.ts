import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private service:SharedService) { }
  
  @Input() val:any;
  Username:string;
  Password:string;
  RememberMe:boolean;
  ReturnUrl:string;

  ngOnInit(): void {
  	this.Username = this.val.Username;
  	this.Password = this.val.Password;
  	this.RememberMe = this.val.RememberMe;
  	this.ReturnUrl = this.val.ReturnUrl;
  }

  login(){
  	var val = {
  		Username:this.Username,
  		Password:this.Password,
  		RememberMe:this.RememberMe,
  		ReturnUrl:this.ReturnUrl
  	}
  	this.service.loginUser(val).subscribe(res => 
  		{alert(res.toString());
  	})
  }
}
  
