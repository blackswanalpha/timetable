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


import {MatStepperModule} from '@angular/material/stepper';
import {  MatInputModule } from '@angular/material/input';
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
import { SpecializationComponent } from './specialization/specialization.component';
import { ModeComponent } from './mode/mode.component';
import { TimeslotComponent } from './timeslot/timeslot.component';
import { DayComponent } from './day/day.component';
import { CampusdayComponent } from './campusday/campusday.component';
import { LecturerspecializationComponent } from './lecturerspecialization/lecturerspecialization.component';
import { LecturertypeComponent } from './lecturertype/lecturertype.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LogoutComponent } from './logout/logout.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { SignupComponent } from './signup/signup.component';
import { RankComponent } from './rank/rank.component';

import { ProfileComponent } from './profile/profile.component';


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
    SemesterComponent,
    SpecializationComponent,
    ModeComponent,
    TimeslotComponent,
    DayComponent,
    CampusdayComponent,
    LecturerspecializationComponent,
    LecturertypeComponent,
    LogoutComponent,
    SignupComponent,
    RankComponent,
    ProfileComponent
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
     MatInputModule,
     MatStepperModule,
     SimpleNotificationsModule.forRoot(),
    MatIconModule,MatCardModule, PdfViewerModule,
    MatDividerModule,MatFormFieldModule,MatSnackBarModule,    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  providers: [UsersService,{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
