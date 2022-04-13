import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 private apiServerUrl = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) {}
// Provide username and password for authentication, and once authentication is successful, 
//store JWT token in session
  authenticate(userName: string, userPassword: any) {
    return this.httpClient
      .post<any>(`${this.apiServerUrl}/timetable/authenticate`, { userName, userPassword })
      .pipe(
        map(userData => {
          sessionStorage.setItem("userName", userName);
          
          let tokenStr = `Bearer ${userData.jwtToken}`;
          console.log(`This is the message`)
          console.log(userData)
          sessionStorage.setItem("token", tokenStr);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("userName");
    // console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("token");

     console.log('logout');
    
  }
}
