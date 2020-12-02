import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  constructor(private service:SharedService, private router: Router) { }

  Username:string;
  Email:string;
  Password:string;
  PasswordConfirm:string;


  ngOnInit(): void {

  }

  register(){
  	var user = {
  		Username:this.Username,
  		Email:this.Email,
  		Password:this.Password,
  		PasswordConfirm:this.PasswordConfirm,
  	}
    //this.service.registerUser(user).subscribe(res => 
    //  {this.router.navigate(["/"]).then(() => {
    //    window.location.reload();
    //  });
    //})
    this.service.registerUser(user).subscribe(res =>
    {
      var loginUser = {
      Username:this.Username,
      Password:this.Password,
      RememberMe:false,
      ReturnUrl:""
    }
    this.service.loginUser(loginUser).subscribe(res =>
    {
      const token = (<any>res).token;
      localStorage.setItem("jwt", token);
      //this.router.navigate(["/"]).then(() => {
      //  window.location.reload();
      //});
       var profile = {
      UserId:this.service.getCurrentUserIdJwt(),
      ProfileName:"",
      ProfilePicturePath:"",
      ProfileInfo:"",
    }
    this.service.addProfile(profile).subscribe(res => 
      {this.router.navigate(["/"]).then(() => {
        window.location.reload();
      });
    })
    });
    });

   

   

  	//this.service.registerUser(user).subscribe(res => 
  	//	{alert(res.toString());
  	//})
  }
}
