import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from './department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

    public getdepartment(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiServerUrl}/timetable/department/fetchAllDepartments`);
  }


    public addDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(`${this.apiServerUrl}/timetable/department/createDepartment`, department);
  }


   public updateDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(`${this.apiServerUrl}/timetable/department/updateDepartment`, department);
  }

  public deleteDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(`${this.apiServerUrl}/timetable/department/deleteDepartment`, department);
  }


   public undoDepartment( department:  Department): Observable< Department> {
  console.log('dfdvsdfvdfv');
    console.log( department);
    return this.http.post< Department>(`${this.apiServerUrl}/timetable/department/undoDepartment`,  department);
  }

  // -------department


}
