import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Semester } from './semester';

@Injectable({
  providedIn: 'root'
})
export class SemesterService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

    public getsemester(): Observable<Semester[]> {
    return this.http.get<Semester[]>(`${this.apiServerUrl}/timetable/semester/fetchAllSemesters`);
  }


    public addSemester(semester: Semester): Observable<Semester> {
    return this.http.post<Semester>(`${this.apiServerUrl}/timetable/semester/createSemester`, semester);
  }


   public updateSemester(semester: Semester): Observable<Semester> {
    return this.http.post<Semester>(`${this.apiServerUrl}/timetable/semester/updateSemester`, semester);
  }

  public deleteSemester(semester: Semester): Observable<Semester> {
    return this.http.post<Semester>(`${this.apiServerUrl}/timetable/semester/deleteSemester`, semester);
  }

   public undoSemester(semester: Semester): Observable<Semester> {
  console.log('dfdvsdfvdfv');
    console.log(semester);
    return this.http.post<Semester>(`${this.apiServerUrl}/timetable/semester/undoSemester`, semester);
  }

  // -------course


}

