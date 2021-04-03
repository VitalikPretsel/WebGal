import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PostComponent } from './post/post.component';
import { NewPostComponent } from './new-post/new-post.component';
import { FollowersComponent } from './followers/followers.component';
import { PostsScrollComponent } from './posts-scroll/posts-scroll.component';


const routes: Routes = [
  { path: '', component: PostsScrollComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:userName', component: ProfileComponent },
  { path: 'editProfile', component: EditProfileComponent },
  { path: 'post/:post', component: PostComponent },
  { path: 'newpost', component: NewPostComponent },
  { path: 'newpost/:postId', component: NewPostComponent },
  { path: 'followers', component: FollowersComponent },
  { path: 'postsScroll', component: PostsScrollComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
