import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  //   public getspecialization(): Observable<Specialization[]> {
  //   return this.http.get<Specialization[]>(`${this.apiServerUrl}/timetable/specialization/fetchAllSpecializations`);
  // }

      public addLogin(login: Login): Observable<Login> {
    return this.http.post<Login>(`${this.apiServerUrl}/timetable/login/createLogin`, login);
  }

      public findByName(login: Login): Observable<Login> {
    return this.http.get<Login>(`${this.apiServerUrl}/timetable/login/findByName`, { params: { loginName: login.loginName } });
  }

}
