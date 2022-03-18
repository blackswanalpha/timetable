import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Building } from './building';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

    public getbuilding(): Observable<Building[]> {
    return this.http.get<Building[]>(`${this.apiServerUrl}/timetable/building/fetchAllBuildings`);
  }


    public addBuilding(building: Building): Observable<Building> {
    return this.http.post<Building>(`${this.apiServerUrl}/timetable/building/createBuilding`, building);
  }


   public updateBuilding(building: Building): Observable<Building> {
    return this.http.post<Building>(`${this.apiServerUrl}/timetable/building/updateBuilding`, building);
  }

  public deleteBuilding(building: Building): Observable<Building> {
    return this.http.post<Building>(`${this.apiServerUrl}/timetable/building/deleteBuilding`, building);
  }


   public undoBuilding( building:  Building): Observable< Building> {
  console.log('dfdvsdfvdfv');
    console.log( building);
    return this.http.post< Building>(`${this.apiServerUrl}/timetable/building/undoBuilding`,  building);
  }

  // -------building


}

