import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Users } from './users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiServerUrl}/timetable/user/fetchAllUsers`);
  }

  public addUsers(users: Users): Observable<Users> {
    return this.http.post<Users>(`${this.apiServerUrl}/timetable/user/createUser`, users);
  }
  
  public updateUsers(users: Users): Observable<Users> {
    return this.http.post<Users>(`${this.apiServerUrl}/timetable/user/updateUser`, users);
  }
      public findByUserName(user: Users): Observable<Users> {

        console.log(user.userFullName);
    return this.http.get<Users>(`${this.apiServerUrl}/timetable/user/findByUserName`, { params: { userName: user.userFullName } });
  }
}
