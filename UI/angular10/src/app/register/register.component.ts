import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() val:any;
  Username:string;
  Email:string;
  Password:string;
  PasswordConfirm:string;

  ngOnInit(): void {
  	this.Username = this.val.Username;
  	this.Email = this.val.Email;
  	this.Password = this.val.Password;
  	this.PasswordConfirm = this.val.PasswordConfirm;
  }

  register(){
  	var val = {
  		Username:this.Username,
  		Email:this.Email,
  		Password:this.Password,
  		PasswordConfirm:this.PasswordConfirm,
  	}
  	this.service.registerUser(val).subscribe(res => 
  		{alert(res.toString());
  	})
  }
}
