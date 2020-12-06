import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.sass']
})
export class NewPostComponent implements OnInit {

  constructor(private service: SharedService, private router: Router) { }

  UserName: string;
  UserId: string;
  profile: any;

  PostText: string;
  PicturePath: string;

  ngOnInit(): void {
    this.UserName = this.service.getCurrentUserNameJwt();
    this.UserId = this.service.getCurrentUserIdJwt();
  }

  post() {
    var date = new Date(Date.now());
    console.log(date);
    console.log(date.toISOString());

    var post = {
      UserID: this.UserId,
      PostText: this.PostText,
      PostDate: date.toISOString(),
      PicturePath: this.PicturePath,
    };
    console.log(post);
    this.service.newPost(post).subscribe(res => {
      this.router.navigate(["/profile/" + this.UserName]).then(() => {
        window.location.reload();
      });
    });
  }

  public uploadFile = (files) => {
    if (files.length === 0) { return; }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.service.uploadFile(formData).subscribe(() => {
      this.PicturePath = "resources/images/" + fileToUpload.name;
      console.log(this.PicturePath);
    });
  }

  public createImgPath = (serverPath: string) => {
    return 'https://localhost:44336/' + serverPath;
  }
}
