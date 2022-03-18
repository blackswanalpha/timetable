import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

    public getcourse(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiServerUrl}/timetable/course/fetchAllCourses`);
  }


    public addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiServerUrl}/timetable/course/createCourse`, course);
  }


   public updateCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiServerUrl}/timetable/course/updateCourse`, course);
  }

  public deleteCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiServerUrl}/timetable/course/deleteCourse`, course);
  }

     public undoCourse( course:  Course): Observable< Course> {
  console.log('dfdvsdfvdfv');
    console.log( course);
    return this.http.post< Course>(`${this.apiServerUrl}/timetable/course/undoCourse`,  course);
  }
}