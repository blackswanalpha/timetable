import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Unit } from './units';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

    public getunit(): Observable<Unit[]> {
    return this.http.get<Unit[]>(`${this.apiServerUrl}/timetable/unit/fetchAllUnits`);
  }


    public addUnit(unit: Unit): Observable<Unit> {
    return this.http.post<Unit>(`${this.apiServerUrl}/timetable/unit/createUnit`, unit);
  }


   public updateUnit(unit: Unit): Observable<Unit> {
    return this.http.post<Unit>(`${this.apiServerUrl}/timetable/unit/updateUnit`, unit);
  }

  public deleteUnit(unit: Unit): Observable<Unit> {
    return this.http.post<Unit>(`${this.apiServerUrl}/timetable/unit/deleteUnit`, unit);
  }

   public undoUnit(unit: Unit): Observable<Unit> {
  console.log('dfdvsdfvdfv');
    console.log(unit);
    return this.http.post<Unit>(`${this.apiServerUrl}/timetable/unit/undoUnit`, unit);
  }

  // -------course


}

