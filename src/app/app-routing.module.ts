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


// const routes: Routes = [{ path: 'lecturer', component: LecturerComponent },{ path: 'users', component: UsersComponent },{ path: 'department', component: DepartmentComponent }];


const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{
		path: '',
		children: [
			{
				path: 'lecturer',
				component: LecturerComponent,
				data: { animationState: 'lecturer' }
			},
			{
				path: 'users',
				component: UsersComponent,
				data: { animationState: 'users' }
			},
			{
				path: 'department',
				component: DepartmentComponent,
				data: { animationState: 'department' }
			},
			{
				path: 'institution',
				component: InstitutionComponent,
				data: { animationState: 'institution' }
			},
			{
				path: 'planner',
				component: PlannerComponent,
				data: { animationState: 'planner' }
			},
			{
				path: 'mode',
				component: ModeComponent,
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
	 {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
