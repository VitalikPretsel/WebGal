import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "https://localhost:44336"

  constructor(private http: HttpClient) { }

  registerUser(val: any) {
    return this.http.post(this.APIUrl + '/account/register/post', val); //, {responseType: 'text'}
  }

  getUser(val: any) {
    return this.http.get(this.APIUrl + '/Account/User/Get/' + val);
  }
  getProfile(val: any) {
    return this.http.get(this.APIUrl + '/Profile/Get/' + val);
  }


  loginUser(val: any) {
    return this.http.post(this.APIUrl + '/Account/Login/Post', val);
  }
  getCurrentUserNameJwt() {
    var helper = new JwtHelperService();
    return helper.decodeToken(localStorage.getItem("jwt")).Name;
  }
  getCurrentUserIdJwt() {
    var helper = new JwtHelperService();
    return helper.decodeToken(localStorage.getItem("jwt")).Id;
  }
  logoutJwt() {
    localStorage.removeItem("jwt");
  }
  isAuthenticatedJwt() {
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
  addProfile(val: any) {
    return this.http.post(this.APIUrl + '/Profile/Add', val);
  }
  editProfile(id: string, val: any) {
    return this.http.put(this.APIUrl + '/Profile/Edit/' + id, val);
  }
  uploadFile(val: any) {
    return this.http.post(this.APIUrl + '/Upload', val);
  }
  deleteFile(val: any) {
    console.log(this.APIUrl + '/Upload/Delete/'+ val);
    return this.http.delete(this.APIUrl + '/Upload/Delete/'+ val);
  }
  getPosts(val: any) {
    return this.http.get(this.APIUrl + '/Post/GetPosts/' + val);
  }
  getPost(val: any) {
    return this.http.get(this.APIUrl + '/Post/GetPost/' + val);
  }
  newPost(val: any) {
    return this.http.post(this.APIUrl + '/Post/Add', val);
  }
  editPost(id: string, val: any) {
    return this.http.put(this.APIUrl + '/Post/Edit/' + id, val);
  }
  deletePost(val: any) {
    console.log(val);
    console.log(this.APIUrl + '/Post/Delete/' + val);
    return this.http.delete(this.APIUrl + '/Post/Delete/' + val);
  }


  getFollowings(val: any) {
    return this.http.get(this.APIUrl + '/Following/GetFollowings/' + val);
  }
  getFollowers(val: any) {
    return this.http.get(this.APIUrl + '/Following/GetFollowers/' + val);
  }

  isFollowing(val1: any, val2: any) {
    return this.http.get(this.APIUrl + '/Following/IsFollowing/' + val1 + "/" + val2);
  }
  follow(val: any) {
    return this.http.post(this.APIUrl + '/Following/Follow', val);
  }
  unfollow(val1: any, val2: any) {
    return this.http.delete(this.APIUrl + '/Following/Unfollow/' + val1 + "/" + val2);
  }
}








/*
  isAuthenticated(){
    return this.http.get(this.APIUrl + '/Account/User/IsAuthenticated', {});
  }
  getCurrentUserName(){
    return this.http.get(this.APIUrl + '/Account/User/CurrentUserName', {});
  }
  logoutUser(){
    return this.http.post(this.APIUrl + '/Account/Logout', {});
  }
*/
