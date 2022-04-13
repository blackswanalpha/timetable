import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rank } from './rank';

@Injectable({
  providedIn: 'root'
})
export class RankService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

    public getrank(): Observable<Rank[]> {
    return this.http.get<Rank[]>(`${this.apiServerUrl}/timetable/rank/fetchAllRanks`);
  }


    public addRank(rank: Rank): Observable<Rank> {
    return this.http.post<Rank>(`${this.apiServerUrl}/timetable/rank/createRank`, rank);
  }


   public updateRank(rank: Rank): Observable<Rank> {
    return this.http.post<Rank>(`${this.apiServerUrl}/timetable/rank/updateRank`, rank);
  }

  public deleteRank(rank: Rank): Observable<Rank> {
    return this.http.post<Rank>(`${this.apiServerUrl}/timetable/rank/deleteRank`, rank);
  }

   public undoRank(rank: Rank): Observable<Rank> {
  console.log('dfdvsdfvdfv');
    console.log(rank);
    return this.http.post<Rank>(`${this.apiServerUrl}/timetable/rank/undoRank`, rank);
  }

  // -------course


}

