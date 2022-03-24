import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Lecturer } from './lecturer';

@Injectable({
  providedIn: 'root'
})
export class LecturerService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

    public getlecturer(): Observable<Lecturer[]> {
    return this.http.get<Lecturer[]>(`${this.apiServerUrl}/timetable/lecturer/fetchAllLecturers`);
  }


    public addLecturer(lecturer: Lecturer): Observable<Lecturer> {
    return this.http.post<Lecturer>(`${this.apiServerUrl}/timetable/lecturer/createLecturer`, lecturer);
  }


   public updateLecturer(lecturer: Lecturer): Observable<Lecturer> {
    return this.http.post<Lecturer>(`${this.apiServerUrl}/timetable/lecturer/updateLecturer`, lecturer);
  }

  public deleteLecturer(lecturer: Lecturer): Observable<Lecturer> {
    return this.http.post<Lecturer>(`${this.apiServerUrl}/timetable/lecturer/deleteLecturer`, lecturer);
  }


   public undoLecturer( lecturer:  Lecturer): Observable< Lecturer> {
  console.log('dfdvsdfvdfv');
    console.log( lecturer);
    return this.http.post< Lecturer>(`${this.apiServerUrl}/timetable/lecturer/undoLecturer`,  lecturer);
  }

  // -------lecturer


}
