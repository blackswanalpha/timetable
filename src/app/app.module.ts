import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UsersService } from './users/users.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentModule } from './department/department.module';
import { DepartmentComponent } from './department/department.component';
import { UsersModule } from './users/users.module';
import { ToastrModule } from 'ngx-toastr';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InterceptorService } from './loader/interceptor.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavComponent } from './nav/nav.component';
import { ButtonavComponent } from './buttonav/buttonav.component';
import { CourseComponent } from './course/course.component';
import { LecturerComponent } from './lecturer/lecturer.component';
import { UnitsComponent } from './units/units.component';
import { FacultyComponent } from './faculty/faculty.component';
import { LoginComponent } from './login/login.component';
import { InstitutionComponent } from './institution/institution.component';
import { RoomComponent } from './room/room.component';
import { CampusComponent } from './campus/campus.component';
import { ErrorComponent } from './error/error.component';
import { SplashComponent } from './splash/splash.component';
import { BuildingComponent } from './building/building.component';
import { PlannerComponent } from './planner/planner.component';
import { SemesterComponent } from './semester/semester.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    DepartmentComponent,
    NavComponent,
    ButtonavComponent,
    CourseComponent,
    LecturerComponent,
    UnitsComponent,
    FacultyComponent,
    LoginComponent,
    InstitutionComponent,
    RoomComponent,
    CampusComponent,
    ErrorComponent,
    SplashComponent,
    BuildingComponent,
    PlannerComponent,
    SemesterComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule,  BrowserAnimationsModule,ToastrModule.forRoot({
    timeOut: 1000,
    positionClass: 'toast-bottom-right',
    preventDuplicates: true,
  }),
    AppRoutingModule, FormsModule, NgBootstrapFormValidationModule.forRoot(),    HttpClientModule, NgbModule, DepartmentModule, UsersModule, 
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,MatCardModule,
    MatDividerModule,MatFormFieldModule,MatSnackBarModule,    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  providers: [UsersService,{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
