import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Timeslot } from './timeslot';

@Injectable({
  providedIn: 'root'
})
export class TimeslotService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

    public gettimeslot(): Observable<Timeslot[]> {
    return this.http.get<Timeslot[]>(`${this.apiServerUrl}/timetable/timeslot/fetchAllTimeslots`);
  }


    public addTimeslot(timeslot: Timeslot): Observable<Timeslot> {
    return this.http.post<Timeslot>(`${this.apiServerUrl}/timetable/timeslot/createTimeslot`, timeslot);
  }


   public updateTimeslot(timeslot: Timeslot): Observable<Timeslot> {
    return this.http.post<Timeslot>(`${this.apiServerUrl}/timetable/timeslot/updateTimeslot`, timeslot);
  }

  public deleteTimeslot(timeslot: Timeslot): Observable<Timeslot> {
    return this.http.post<Timeslot>(`${this.apiServerUrl}/timetable/timeslot/deleteTimeslot`, timeslot);
  }

   public undoTimeslot(timeslot: Timeslot): Observable<Timeslot> {
  console.log('dfdvsdfvdfv');
    console.log(timeslot);
    return this.http.post<Timeslot>(`${this.apiServerUrl}/timetable/timeslot/undoTimeslot`, timeslot);
  }

  // -------course


}

