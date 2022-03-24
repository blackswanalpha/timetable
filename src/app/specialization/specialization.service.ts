import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Specialization } from './specialization';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

    public getspecialization(): Observable<Specialization[]> {
    return this.http.get<Specialization[]>(`${this.apiServerUrl}/timetable/specialization/fetchAllSpecializations`);
  }


    public addSpecialization(specialization: Specialization): Observable<Specialization> {
    return this.http.post<Specialization>(`${this.apiServerUrl}/timetable/specialization/createSpecialization`, specialization);
  }


   public updateSpecialization(specialization: Specialization): Observable<Specialization> {
    return this.http.post<Specialization>(`${this.apiServerUrl}/timetable/specialization/updateSpecialization`, specialization);
  }

  public deleteSpecialization(specialization: Specialization): Observable<Specialization> {
    return this.http.post<Specialization>(`${this.apiServerUrl}/timetable/specialization/deleteSpecialization`, specialization);
  }

   public undoSpecialization(specialization: Specialization): Observable<Specialization> {
  console.log('dfdvsdfvdfv');
    console.log(specialization);
    return this.http.post<Specialization>(`${this.apiServerUrl}/timetable/specialization/undoSpecialization`, specialization);
  }

  // -------course


}

