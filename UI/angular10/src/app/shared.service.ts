import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "https://localhost:44336"

  constructor(private http:HttpClient) { }

  registerUser(val:any){
    return this.http.post(this.APIUrl + '/account/register/post', val, {responseType: 'text'});
  }

  getUser(val:any){
  	return this.http.get(this.APIUrl + '/Account/Register/Get', val);
  }

  isAuthenticated(){
    return this.http.get(this.APIUrl + '/Account/User/IsAuthenticated', {});
  }
  getCurrentUserName(){
    return this.http.get(this.APIUrl + '/Account/User/CurrentUserName', {});
  }

  loginUser(val:any){
  	return this.http.post(this.APIUrl + '/Account/Login/Post', val);
  }

  logoutUser(){
  	return this.http.post(this.APIUrl + '/Account/Logout', {});
  } 

  getCurrentUserNameJwt(){
    var helper = new JwtHelperService();
    return helper.decodeToken(localStorage.getItem("jwt")).Name;
  }
  logoutJwt(){
    localStorage.removeItem("jwt");
  }
  isAuthenticatedJwt(){
    var jwtHelper = new JwtHelperService();
    const token: string = localStorage.getItem("jwt");
    if (token && !jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      this.logoutJwt();
      return false;
    }
  }
}
