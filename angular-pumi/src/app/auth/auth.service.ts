import { HttpClient } from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {WEB_URL} from '../constants/list';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
    this.webUrl = WEB_URL;
    if (localStorage.getItem('JWT_Token')) {
      this.isLoggedIn = true;
    }
  }

  webUrl!: string;
  isLoggedIn: boolean = false;
  isUserRegistered: boolean = false;

  login(userDetails: { email: string; password: string }): Observable<boolean> {
    console.log('Auth Service Login: ', userDetails.email);
    return this.http.post<any>(this.webUrl + '/login', userDetails)
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

  signUp(userDetails: { email: string; alias: string, password: string }): Observable<boolean> {
    console.log('Auth Service Sign-up: ', userDetails.alias);
    return this.http.post<any>(this.webUrl + '/user', userDetails)
      .pipe(
        map(() => {
          this.isUserRegistered = true;
          return true;
        }),
        catchError(error => {
          console.log(error);
          this.isUserRegistered = false;
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

  isUserCreated(): boolean {
    return this.isUserRegistered;
  }
}
