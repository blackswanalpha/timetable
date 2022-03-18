import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Room } from './room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

    public getroom(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiServerUrl}/timetable/room/fetchAllRooms`);
  }


    public addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.apiServerUrl}/timetable/room/createRoom`, room);
  }


   public updateRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.apiServerUrl}/timetable/room/updateRoom`, room);
  }

  public deleteRoom(room: Room): Observable<Room> {
     console.log('dfdeeeffefv');
    console.log( room);
    return this.http.post<Room>(`${this.apiServerUrl}/timetable/room/deleteRoom`, room);
  }

     public undoRoom( room:  Room): Observable< Room> {
  console.log('dfdvsdfvdfv');
    console.log( room);
    return this.http.post< Room>(`${this.apiServerUrl}/timetable/room/undoRoom`,  room);
  }
}