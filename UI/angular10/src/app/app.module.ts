import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SharedService } from './shared.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PostComponent } from './post/post.component';
import { FollowersComponent } from './followers/followers.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostsScrollComponent } from './posts-scroll/posts-scroll.component';

/*
export function TokenGetter(){
  return localStorage.getItem("jwt");
}
*/

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccountComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    EditProfileComponent,
    PostComponent,
    FollowersComponent,
    NewPostComponent,
    PostsScrollComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }

/*
JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    })
*/
