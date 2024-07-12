import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Club } from './club';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  CLUB_URL = 'http://localhost:3000/club/';

  constructor(private readonly http: HttpClient) {}
  

  getAllClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(this.CLUB_URL)
  }
  
  getClubContentById(id: number): Observable<Club> {
    return this.http.get<Club>(`${this.CLUB_URL}${id}`);
  }

  createClub(club: Club): Observable<Club> {
    return this.http.post<Club>(`${this.CLUB_URL}create`, club);
  }

  updateClub(id: number, club: Club): Observable<Club> {
    return this.http.put<Club>(`${this.CLUB_URL}edit/${id}`, club);
  }

  deleteClub(id: number): Observable<void> {
    return this.http.delete<void>(`${this.CLUB_URL}remove/${id}`);
  }

}
