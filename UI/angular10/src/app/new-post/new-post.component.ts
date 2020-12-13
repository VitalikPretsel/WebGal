import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.sass']
})
export class NewPostComponent implements OnInit {

  constructor(private service: SharedService, private route: ActivatedRoute, private router: Router) { }

  UserName: string;
  UserId: string;
  profile: any;

  postdata: any;
  postId: any;
  isPosting: boolean = false;
  
  PostText: string;
  PicturePath: string;

  formData: any;
  fileToUpload: any;

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('postId');
    console.log(this.postId);
    if (this.postId == null)
      this.isPosting = true;
    else
    {
      this.service.getPost(this.postId).subscribe(res => {
        this.postdata = res;
        this.PostText = this.postdata.postText;
        this.PicturePath = this.postdata.picturePath;
      });
    }
    this.UserName = this.service.getCurrentUserNameJwt();
    this.UserId = this.service.getCurrentUserIdJwt();
  }

  post() {
    this.service.newPost(this.getPostModel()).subscribe(res => {
      this.router.navigate(["/profile/" + this.UserName]).then(() => {
        window.location.reload();
      });
    });
  }


  editPost()
  {
    this.service.editPost(this.postId, this.getPostModel()).subscribe(res => {
      this.router.navigate(["/profile/" + this.UserName]).then(() => {
        window.location.reload();
      });
    });
  }

  getPostModel()
  {
    var date = new Date(Date.now());
    console.log(date);
    console.log(date.toISOString());
    console.log(date.toUTCString());
    var post = {
      UserID: this.UserId,
      PostText: this.PostText,
      PostDate: date.toISOString(),
      PicturePath: this.PicturePath,
    };
    console.log(post);

    return post;
  }

  public uploadFile = (files) => {
    if (files.length === 0) { return; }

    this.fileToUpload = <File>files[0];
    this.formData = new FormData();
    this.formData.append('file', this.fileToUpload, this.fileToUpload.name);
    this.service.uploadFile(this.formData).subscribe(() => {
      this.PicturePath = "resources/images/" + this.fileToUpload.name;
      console.log(this.PicturePath);
    });
  }

  public deleteFile() {
    console.log(this.formData);
    this.service.deleteFile(this.fileToUpload.name).subscribe(() =>
      this.formData.delete("file")
    );
  }

  public createImgPath = (serverPath: string) => {
    return 'https://localhost:44336/' + serverPath;
  }
}
