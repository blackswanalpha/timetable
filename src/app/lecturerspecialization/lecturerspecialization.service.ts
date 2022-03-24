import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Lecturerspecialization } from './lecturerspecialization';

@Injectable({
  providedIn: 'root'
})
export class LecturerspecializationService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

    public getlecturerspecialization(): Observable<Lecturerspecialization[]> {
    return this.http.get<Lecturerspecialization[]>(`${this.apiServerUrl}/timetable/lecturerspecialization/fetchAllLecturerspecializations`);
  }


    public addLecturerspecialization(lecturerspecialization: Lecturerspecialization): Observable<Lecturerspecialization> {
    return this.http.post<Lecturerspecialization>(`${this.apiServerUrl}/timetable/lecturerspecialization/createLecturerspecialization`, lecturerspecialization);
  }


   public updateLecturerspecialization(lecturerspecialization: Lecturerspecialization): Observable<Lecturerspecialization> {
    return this.http.post<Lecturerspecialization>(`${this.apiServerUrl}/timetable/lecturerspecialization/updateLecturerspecialization`, lecturerspecialization);
  }

  public deleteLecturerspecialization(lecturerspecialization: Lecturerspecialization): Observable<Lecturerspecialization> {
    return this.http.post<Lecturerspecialization>(`${this.apiServerUrl}/timetable/lecturerspecialization/deleteLecturerspecialization`, lecturerspecialization);
  }


   public undoLecturerspecialization( lecturerspecialization:  Lecturerspecialization): Observable< Lecturerspecialization> {
  console.log('dfdvsdfvdfv');
    console.log( lecturerspecialization);
    return this.http.post< Lecturerspecialization>(`${this.apiServerUrl}/timetable/lecturerspecialization/undoLecturerspecialization`,  lecturerspecialization);
  }

  // -------lecturerspecialization


}
