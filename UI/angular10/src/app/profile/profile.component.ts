import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  isAuth: boolean;
  authUserName: string;
  authUserId: string;
  isAuthCurrentUser: boolean;

  isFollowing: boolean;
  following: any;
  followers: any;
  followings: any;

  followingsTarget: string = "Followers";

  userName: string;
  user: any;
  profile: any;

  post: any;
  posts: any;
  items: any;
  itemInRowRange: any;

  ActivateShowPost: boolean = false;

  constructor(private service: SharedService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.getAuthInfo();
      this.service.getUser(this.userName).subscribe((userdata) => {
        this.user = userdata;
        this.getFollowInfo();
        this.service.getProfile(this.user.id).subscribe((profiledata) => {
          this.profile = profiledata;
          this.profile.profilePicturePath = "https://localhost:44336/" + this.profile.profilePicturePath
        });

        this.loadPosts();
      });
    });
  }

  getAuthInfo() {
    this.userName = this.route.snapshot.paramMap.get('userName');
    this.isAuth = this.service.isAuthenticatedJwt();
    if (this.isAuth) {
      this.authUserName = this.service.getCurrentUserNameJwt();
      this.isAuthCurrentUser = this.authUserName == this.userName;
    }
  }

  getFollowInfo() {
    if (this.isAuth) {
      this.authUserId = this.service.getCurrentUserIdJwt();
      this.service.isFollowing(this.authUserId, this.user.id).subscribe((isFollowing: boolean) => {
        this.isFollowing = isFollowing;
      });
      this.following = {
        FollowerUserId: this.authUserId,
        FollowingUserId: this.user.id,
      }
    }
    else {
      this.isFollowing = false;
    }

    this.service.getFollowers(this.user.id).subscribe((followersdata) => {
      this.followers = followersdata;
    });
    this.service.getFollowings(this.user.id).subscribe((followingsdata) => {
      this.followings = followingsdata;
    });
  }

  follow() {
    if (this.isAuth)
      this.service.follow(this.following).subscribe(() => {
        window.location.reload();
      });
    else
      this.router.navigate(["/login"]);
  }
  unfollow() {
    this.service.unfollow(this.following.FollowerUserId, this.following.FollowingUserId).subscribe(() => {
      window.location.reload();
    });
  }

  changeFollowTarget(val: string) {
    this.followingsTarget = val;
  }

  showPost(item) {
    this.post = item;
    this.ActivateShowPost = true;
  }

  deletePost() {
    this.service.deletePost(this.post.id).subscribe(() => this.closePost());
  }

  closePost() {
    this.ActivateShowPost = false;
    this.loadPosts();
  }

  loadPosts() {
    this.service.getPosts(this.user.id).subscribe((postsdata) => {
      this.posts = postsdata;
      let itemsInRow = 3;
      this.itemInRowRange = Array.from(Array(itemsInRow).keys());
      this.items = of(this.posts);
    });
  }

  public createImgPath = (serverPath: string) => {
    return 'https://localhost:44336/' + serverPath;
  }
}


