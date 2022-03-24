import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Campusday } from './campusday';

@Injectable({
  providedIn: 'root'
})
export class CampusdayService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

    public getcampusday(): Observable<Campusday[]> {
    return this.http.get<Campusday[]>(`${this.apiServerUrl}/timetable/campusday/fetchAllCampusdays`);
  }


    public addCampusday(campusday: Campusday): Observable<Campusday> {
    return this.http.post<Campusday>(`${this.apiServerUrl}/timetable/campusday/createCampusday`, campusday);
  }


   public updateCampusday(campusday: Campusday): Observable<Campusday> {
    return this.http.post<Campusday>(`${this.apiServerUrl}/timetable/campusday/updateCampusday`, campusday);
  }

  public deleteCampusday(campusday: Campusday): Observable<Campusday> {
    return this.http.post<Campusday>(`${this.apiServerUrl}/timetable/campusday/deleteCampusday`, campusday);
  }

   public undoCampusday(campusday: Campusday): Observable<Campusday> {
  console.log('dfdvsdfvdfv');
    console.log(campusday);
    return this.http.post<Campusday>(`${this.apiServerUrl}/timetable/campusday/undoCampusday`, campusday);
  }

  // -------course


}

