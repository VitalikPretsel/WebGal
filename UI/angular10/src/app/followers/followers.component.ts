import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.sass']
})
export class FollowersComponent implements OnInit {

  constructor(private service: SharedService, private route: ActivatedRoute) { }

  @Input() followers: any;
  @Input() followingsTarget: string;

  profiles: any = [];
  users: any = [];

  ngOnInit(): void {
    this.loadProfilesAndUsers();
  }

  loadProfilesAndUsers() {
    this.followers.forEach(f => {
      let targetUserId = (this.followingsTarget == "Followers") ? f.followerUserId : f.followingUserId;

      this.service.getProfile(targetUserId).subscribe((profiledata) => {
        this.profiles.push(profiledata);
      });
      this.service.getUser(targetUserId).subscribe((userdata) => {
        this.users.push(userdata);
      });
    });
  }

  public createImgPath = (serverPath: string) => {
    return 'https://localhost:44336/' + serverPath;
  }
}
