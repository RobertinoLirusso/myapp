import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AUTH_URL = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.AUTH_URL}/login`, { username, password }).pipe(
      tap(response => {
        if (response.access_token && isLocalStorageAvailable()) {
          localStorage.setItem('access_token', response.access_token);
        }
      })
    );
  }

  getUserInfo(): Observable<any> {
    let headers = new HttpHeaders();
    if (isLocalStorageAvailable()) {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return this.http.get<any>(`${this.AUTH_URL}/user-info`, { headers });
  }

  logout(): void {
    if (isLocalStorageAvailable()) {
      localStorage.removeItem('access_token');
    }
  }

  isAuthenticated(): boolean {
    if (isLocalStorageAvailable()) {
      return !!localStorage.getItem('access_token');
    }
    return false;
  }
}

function isLocalStorageAvailable(): boolean {
  try {
    const testKey = 'test';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}
