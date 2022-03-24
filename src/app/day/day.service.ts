import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Day } from './day';

@Injectable({
  providedIn: 'root'
})
export class DayService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

    public getday(): Observable<Day[]> {
    return this.http.get<Day[]>(`${this.apiServerUrl}/timetable/day/fetchAllDays`);
  }


    public addDay(day: Day): Observable<Day> {
    return this.http.post<Day>(`${this.apiServerUrl}/timetable/day/createDay`, day);
  }


   public updateDay(day: Day): Observable<Day> {
    return this.http.post<Day>(`${this.apiServerUrl}/timetable/day/updateDay`, day);
  }

  public deleteDay(day: Day): Observable<Day> {
    return this.http.post<Day>(`${this.apiServerUrl}/timetable/day/deleteDay`, day);
  }


   public undoDay( day:  Day): Observable< Day> {
  console.log('dfdvsdfvdfv');
    console.log( day);
    return this.http.post< Day>(`${this.apiServerUrl}/timetable/day/undoDay`,  day);
  }

  // -------day


}
