import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { ErrorComponent } from './error/error.component';
import { InstitutionComponent } from './institution/institution.component';
import { LecturerComponent } from './lecturer/lecturer.component';
import { LoginComponent } from './login/login.component';
import { PlannerComponent } from './planner/planner.component';
import { UsersComponent } from './users/users.component';
import { ModeComponent } from './mode/mode.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthguardService } from './loader/authguard.service';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';


// const routes: Routes = [{ path: 'lecturer', component: LecturerComponent },{ path: 'users', component: UsersComponent },{ path: 'department', component: DepartmentComponent }];


const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'profile', component: ProfileComponent },
	  { path: 'logout', component: LogoutComponent,canActivate:[AuthguardService] },

	{
		path: '',
		children: [
			{
				path: 'lecturer',
				component: LecturerComponent,
				canActivate:[AuthguardService],
				data: { animationState: 'lecturer' }
			},
			{
				path: 'users',
				component: UsersComponent,
				canActivate:[AuthguardService],
				data: { animationState: 'users' }
			},
			{
				path: 'department',
				component: DepartmentComponent,
				canActivate:[AuthguardService],
				data: { animationState: 'department' }
			},
			{
				path: 'institution',
				component: InstitutionComponent,
				canActivate:[AuthguardService],
				data: { animationState: 'institution' }
			},
			{
				path: 'planner',
				component: PlannerComponent,
				canActivate:[AuthguardService],
				data: { animationState: 'planner' }
			},
			{
				path: 'mode',
				component: ModeComponent,
				canActivate:[AuthguardService],
				data: { animationState: 'mode' }
			},
			{
				path: '**',
				component: ErrorComponent,
				data: { animationState: 'institution' }
			}
		]
	},
	{
		path: '**',
		component: ErrorComponent,
	},
	  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
