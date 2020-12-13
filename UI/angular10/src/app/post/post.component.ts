import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {

  user: any;
  profile: any;

  postDate: any;

  constructor(public service: SharedService) { }

  @Input() post: any;

  ngOnInit(): void {
    this.service.getUser(this.post.userID).subscribe((userdata) => {
        this.user = userdata;
        this.service.getProfile(this.user.id).subscribe((profiledata) => {
          this.profile = profiledata;
          var d = new Date(this.post.postDate);
          //this.postDate = d.getUTCDate() + "/" + d.getUTCMonth() + "/" + d.getUTCFullYear();
          this.postDate = d.toUTCString();

          if (this.profile.profilePicturePath == "" || this.profile.profilePicturePath == null)
            this.profile.profilePicturePath = "https://images.vexels.com/media/users/3/147103/isolated/preview/e9bf9a44d83e00b1535324b0fda6e91a-instagram-profile-line-icon-by-vexels.png";
          //this.profile.profilePicturePath = "https://localhost:44336/" + this.profile.profilePicturePath
        });
    });
  }

  public createImgPath = (serverPath: string) => {
    return 'https://localhost:44336/' + serverPath;
  }
}

