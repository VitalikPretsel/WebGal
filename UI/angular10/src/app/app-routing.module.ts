import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
{path: 'account', component:AccountComponent},
{path: 'register', component:RegisterComponent},
{path: 'login', component:LoginComponent},
{path: 'profile', component:ProfileComponent},
{path: 'profile/:userName', component:ProfileComponent},
{path: 'editProfile', component:EditProfileComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}