import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Lecturertype } from './lecturertype';

@Injectable({
  providedIn: 'root'
})
export class LecturertypeService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

    public getlecturertype(): Observable<Lecturertype[]> {
    return this.http.get<Lecturertype[]>(`${this.apiServerUrl}/timetable/lecturertype/fetchAllLecturertypes`);
  }


    public addLecturertype(lecturertype: Lecturertype): Observable<Lecturertype> {
    return this.http.post<Lecturertype>(`${this.apiServerUrl}/timetable/lecturertype/createLecturertype`, lecturertype);
  }


   public updateLecturertype(lecturertype: Lecturertype): Observable<Lecturertype> {
    return this.http.post<Lecturertype>(`${this.apiServerUrl}/timetable/lecturertype/updateLecturertype`, lecturertype);
  }

  public deleteLecturertype(lecturertype: Lecturertype): Observable<Lecturertype> {
    return this.http.post<Lecturertype>(`${this.apiServerUrl}/timetable/lecturertype/deleteLecturertype`, lecturertype);
  }


   public undoLecturertype( lecturertype:  Lecturertype): Observable<Lecturertype> {
  console.log('dfdvsdfvdfv');
    console.log( lecturertype);
    return this.http.post< Lecturertype>(`${this.apiServerUrl}/timetable/lecturertype/undoLecturertype`,  lecturertype);
  }

  // -------lecturertype


}

