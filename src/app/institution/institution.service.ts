import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Institution } from './institution';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

    public getinstitution(): Observable<Institution[]> {
    return this.http.get<Institution[]>(`${this.apiServerUrl}/timetable/institution/fetchAllInstitutions`);
  }


    public addInstitution(institution: Institution): Observable<Institution> {
    return this.http.post<Institution>(`${this.apiServerUrl}/timetable/institution/createInstitution`, institution);
  }


   public updateInstitution(institution: Institution): Observable<Institution> {
    return this.http.post<Institution>(`${this.apiServerUrl}/timetable/institution/updateInstitution`, institution);
  }

  public deleteInstitution(institution: Institution): Observable<Institution> {
    return this.http.post<Institution>(`${this.apiServerUrl}/timetable/institution/deleteInstitution`, institution);
  }

  // -------course


}

