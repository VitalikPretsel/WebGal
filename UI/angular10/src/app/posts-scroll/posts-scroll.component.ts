import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-scroll',
  templateUrl: './posts-scroll.component.html',
  styleUrls: ['./posts-scroll.component.sass']
})

export class PostsScrollComponent implements OnInit {


  authUserName: string;
  authUserId: string;

  followings: any = [];

  posts: any = [];
  tempposts: any = [];
  promises: any = [];


  constructor(private service: SharedService, private router: Router) { }

  ngOnInit(): void {
    if (this.service.isAuthenticatedJwt())
    {
  	  this.getPostsInfo();
    }
    else
      this.router.navigate(["/login"]).then(() => {
        window.location.reload();
      });
  }

  getPostsInfo() {
    console.log("get");

    this.authUserId = this.service.getCurrentUserIdJwt();
    this.authUserName = this.service.getCurrentUserNameJwt();
    this.service.getFollowings(this.authUserId).subscribe((followingsdata) => {
      this.followings = followingsdata;
  	  this.loadPosts().then(() => { this.posts = this.tempposts; console.log(this.posts)});
      
    });
  }

  loadPosts() {
    return new Promise((resolve) => {
  	for (var following in this.followings) {
      this.promises.push(
      new Promise((resolve) =>
      this.service.getPosts(this.followings[following].followingUserId).subscribe((postsdata) => {
     	  this.tempposts = this.tempposts.concat(postsdata);
        resolve(following);
      })));
    }
    Promise.all(this.promises).then(() =>
    {
      this.sortPosts().then(() => resolve());
    }
    );
    }); 
  }

  sortPosts() {
    return new Promise((resolve) => {
      this.tempposts.sort(function (a, b) { return b.postDate - a.postDate; })
      resolve(this.tempposts);
    })
  }
}
