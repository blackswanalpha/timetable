import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mode } from './mode';

@Injectable({
  providedIn: 'root'
})
export class ModeService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

    public getmode(): Observable<Mode[]> {
    return this.http.get<Mode[]>(`${this.apiServerUrl}/timetable/mode/fetchAllModes`);
  }


    public addMode(mode: Mode): Observable<Mode> {
    return this.http.post<Mode>(`${this.apiServerUrl}/timetable/mode/createMode`, mode);
  }


   public updateMode(mode: Mode): Observable<Mode> {
    return this.http.post<Mode>(`${this.apiServerUrl}/timetable/mode/updateMode`, mode);
  }

  public deleteMode(mode: Mode): Observable<Mode> {
    return this.http.post<Mode>(`${this.apiServerUrl}/timetable/mode/deleteMode`, mode);
  }


   public undoMode( mode:  Mode): Observable< Mode> {
  console.log('dfdvsdfvdfv');
    console.log( mode);
    return this.http.post< Mode>(`${this.apiServerUrl}/timetable/mode/undoMode`,  mode);
  }

  // -------mode


}
