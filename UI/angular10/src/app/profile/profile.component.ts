import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  userName: string;
  user : any;
  profile: any;

  constructor(private service:SharedService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  	this.userName = this.route.snapshot.paramMap.get('userName');

  	this.service.getUser(this.userName).subscribe((userdata) => 
  	{ 
  		this.user = userdata; 
  		this.service.getProfile(this.user.id).subscribe((profiledata) => 
  		{ 
  			this.profile = profiledata;
  			if (this.profile.profilePicturePath == "" || this.profile.profilePicturePath == null)
  				this.profile.profilePicturePath = "https://images.vexels.com/media/users/3/147103/isolated/preview/e9bf9a44d83e00b1535324b0fda6e91a-instagram-profile-line-icon-by-vexels.png"; 
  			this.profile.profilePicturePath = this.sanitizer.bypassSecurityTrustUrl("https://localhost:44336/" + this.profile.profilePicturePath);
  		});
  	});

  }
}


