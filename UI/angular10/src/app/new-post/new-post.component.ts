import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { UploadService } from 'src/app/upload.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.sass']
})
export class NewPostComponent implements OnInit {

  constructor(private service: SharedService, public uploadService: UploadService, private route: ActivatedRoute, private router: Router) { }

  UserName: string;
  UserId: string;
  profile: any;

  postdata: any;
  postId: any;
  isPosting: boolean = false;
  
  PostText: string;

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('postId');
    if (this.postId == null)
      this.isPosting = true;
    else
    {
      this.service.getPost(this.postId).subscribe(res => {
        this.postdata = res;
        this.PostText = this.postdata.postText;
        this.uploadService.picturePath = this.postdata.picturePath;
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
    var post = {
      UserID: this.UserId,
      PostText: this.PostText,
      PostDate: date.toISOString(),
      PicturePath: this.uploadService.picturePath,
    };
    return post;
  }

  public createImgPath = (serverPath: string) => {
    return 'https://localhost:44336/' + serverPath;
  }
}
