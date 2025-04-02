import { HttpClient } from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isLoggedIn: boolean = false;

  login(userDetails: { email: string; password: string }): Observable<boolean> {
    console.log('Auth Service: ', userDetails);
    return this.http.post<any>('http://127.0.0.1:5000/login', userDetails)
      .pipe(
        map(response => {
          localStorage.setItem('JWT_Token', response.token);
          this.isLoggedIn = true;
          return true;
        }),
        catchError(error => {
          console.log(error);
          this.isLoggedIn = false;
          return of(false);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('JWT_Token');
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
