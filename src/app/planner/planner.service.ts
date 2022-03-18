import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Planner } from './planner';

@Injectable({
  providedIn: 'root'
})
export class PlannerService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

    public getplanner(): Observable<Planner[]> {
    return this.http.get<Planner[]>(`${this.apiServerUrl}/timetable/planner/fetchAllPlanners`);
  }


    public addPlanner(planner: Planner): Observable<Planner> {
    return this.http.post<Planner>(`${this.apiServerUrl}/timetable/planner/createPlanner`, planner);
  }


   public updatePlanner(planner: Planner): Observable<Planner> {
    return this.http.post<Planner>(`${this.apiServerUrl}/timetable/planner/updatePlanner`, planner);
  }

  public deletePlanner(planner: Planner): Observable<Planner> {
    return this.http.post<Planner>(`${this.apiServerUrl}/timetable/planner/deletePlanner`, planner);
  }


   public undoPlanner( planner:  Planner): Observable< Planner> {
  console.log('dfdvsdfvdfv');
    console.log( planner);
    return this.http.post< Planner>(`${this.apiServerUrl}/timetable/planner/undoPlanner`,  planner);
  }

  // -------planner


}
