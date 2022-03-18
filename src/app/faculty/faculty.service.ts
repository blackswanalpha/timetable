import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Faculty } from './faculty';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

    public getfaculty(): Observable<Faculty[]> {
    return this.http.get<Faculty[]>(`${this.apiServerUrl}/timetable/faculty/fetchAllFacultys`);
  }


    public addFaculty(faculty: Faculty): Observable<Faculty> {
    return this.http.post<Faculty>(`${this.apiServerUrl}/timetable/faculty/createFaculty`, faculty);
  }


   public updateFaculty(faculty: Faculty): Observable<Faculty> {
    return this.http.post<Faculty>(`${this.apiServerUrl}/timetable/faculty/updateFaculty`, faculty);
  }

  public deleteFaculty(faculty: Faculty): Observable<Faculty> {
    return this.http.post<Faculty>(`${this.apiServerUrl}/timetable/faculty/deleteFaculty`, faculty);
  }


   public undoFaculty( faculty:  Faculty): Observable< Faculty> {
  console.log('dfdvsdfvdfv');
    console.log( faculty);
    return this.http.post< Faculty>(`${this.apiServerUrl}/timetable/faculty/undoFaculty`,  faculty);
  }

  // -------faculty


}

