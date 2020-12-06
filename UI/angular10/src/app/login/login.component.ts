import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private service: SharedService, private router: Router, private cookieService: CookieService) { }

  Username: string;
  Password: string;
  RememberMe: boolean;
  ReturnUrl: string;

  ngOnInit(): void {
    if (this.cookieService.check("username")) {
      this.Username = this.cookieService.get("username");
      this.Password = this.cookieService.get("password");
      this.RememberMe = true;
    }
  }

  login() {
    var val = {
      Username: this.Username,
      Password: this.Password,
      RememberMe: this.RememberMe,
      ReturnUrl: this.ReturnUrl
    }
    this.service.loginUser(val).subscribe(res => {
      const token = (<any>res).token;
      localStorage.setItem("jwt", token);
      this.router.navigate(["/"]).then(() => {
        window.location.reload();
      });
      if (this.RememberMe) {
        this.cookieService.set("username", this.Username);
        this.cookieService.set("password", this.Password);
      }
      else {
        this.cookieService.delete("username");
        this.cookieService.delete("password");
      }
    });


    //this.service.loginUser(val).subscribe(res => 
    //	{alert(res.toString());
    //});
  }
}

