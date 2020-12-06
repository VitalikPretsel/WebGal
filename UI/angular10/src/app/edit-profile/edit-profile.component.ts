import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.sass']
})
export class EditProfileComponent implements OnInit {

  constructor(private service: SharedService, private router: Router, private sanitizer: DomSanitizer) { }

  UserName: string;
  UserId: string;
  profile: any;

  ProfileName: string;
  ProfileInfo: string;
  ProfilePicturePath: string;

  ngOnInit(): void {
    this.UserName = this.service.getCurrentUserNameJwt();
    this.UserId = this.service.getCurrentUserIdJwt();
    this.service.getProfile(this.UserId).subscribe((profiledata) => {
      this.profile = profiledata;
      this.ProfileName = this.profile.profileName;
      this.ProfileInfo = this.profile.profileInfo;
      this.ProfilePicturePath = this.profile.profilePicturePath;

      if (this.profile.profilePicturePath == "" || this.profile.profilePicturePath == null)
        this.profile.profilePicturePath = "https://images.vexels.com/media/users/3/147103/isolated/preview/e9bf9a44d83e00b1535324b0fda6e91a-instagram-profile-line-icon-by-vexels.png";
      //this.profile.profilePicturePath = this.sanitizer.bypassSecurityTrustUrl("https://localhost:44336/" + this.profile.profilePicturePath);
      this.profile.profilePicturePath = "https://localhost:44336/" + this.profile.profilePicturePath;
    });
  }

  saveChanges() {
    var editedProfile = {
      ProfileName: this.ProfileName,
      ProfileInfo: this.ProfileInfo,
      ProfilePicturePath: this.ProfilePicturePath,
    };
    this.service.editProfile(this.UserId, editedProfile).subscribe(res => {
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
      console.log(fileToUpload);
      console.log(fileToUpload.name);

      this.ProfilePicturePath = "resources/images/" + fileToUpload.name;
      console.log(this.ProfilePicturePath);
    });
  }

  public createImgPath = (serverPath: string) => {
    return 'https://localhost:44336/' + serverPath;
  }
}



/*

event => {
  		if (event.type === HttpEventType.UploadProgress)
  			this.progress = Math.round(100 * event.loaded / event.total);
  		else if (event.type === HttpEventType.Response)
  		{
  			this.message = 'Upload success.';
  			this.onUploadFinished.emit(evet.body);
  		}
  	}

*/
