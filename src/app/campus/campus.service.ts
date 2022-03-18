import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Campus } from './campus';

@Injectable({
  providedIn: 'root'
})
export class CampusService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

    public getcampus(): Observable<Campus[]> {
    return this.http.get<Campus[]>(`${this.apiServerUrl}/timetable/campus/fetchAllCampuss`);
  }


    public addCampus(campus: Campus): Observable<Campus> {
    return this.http.post<Campus>(`${this.apiServerUrl}/timetable/campus/createCampus`, campus);
  }


   public updateCampus(campus: Campus): Observable<Campus> {
    return this.http.post<Campus>(`${this.apiServerUrl}/timetable/campus/updateCampus`, campus);
  }

  public deleteCampus(campus: Campus): Observable<Campus> {
    return this.http.post<Campus>(`${this.apiServerUrl}/timetable/campus/deleteCampus`, campus);
  }

     public undoCampus( campus:  Campus): Observable< Campus> {
  console.log('dfdvsdfvdfv');
    console.log( campus);
    return this.http.post< Campus>(`${this.apiServerUrl}/timetable/campus/undoCampus`,  campus);
  }
}