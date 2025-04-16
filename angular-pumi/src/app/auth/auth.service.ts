import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {JWT_TOKEN_KEY} from '../constants/list';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
    this.webUrl = environment.domain;
    if (sessionStorage.getItem(JWT_TOKEN_KEY)) {
      this.isLoggedIn = true;
    }
  }

  webUrl!: string;
  isLoggedIn: boolean = false;
  isUserRegistered: boolean = false;
  jwt_expiration_seconds = 3600;

  refreshJwtToken(): Observable<boolean> {
    let action:string = 'refreshing';
    console.log('Auth Service ' + action + ' token.');
    return this.http.get<any>(this.webUrl + '/auth/token')
      .pipe(
        map(response => {
          sessionStorage.removeItem(JWT_TOKEN_KEY);
          this.extracted(response, action);
          return true;
        }),
        catchError(error => {
          console.log(error);
          this.isLoggedIn = false;
          return of(false);
        })
      );
  }

  login(userDetails: { email: string; password: string }): Observable<boolean> {
    console.log('Auth Service Login: ', userDetails.email);
    return this.http.post<any>(this.webUrl + '/auth/login', userDetails)
      .pipe(
        map(response => {
          this.extracted(response, 'login');
          return true;
        }),
        catchError(error => {
          console.log(error);
          this.isLoggedIn = false;
          return of(false);
        })
      );
  }

  private extracted(response: any, action: string) {
    let token_duration_minutes = response['expires_minutes'];
    this.jwt_expiration_seconds = token_duration_minutes * 60;
    console.log(action , 'jwt expiration seconds:', this.jwt_expiration_seconds);
    sessionStorage.setItem(JWT_TOKEN_KEY, response.token);
    this.isLoggedIn = true;
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
    sessionStorage.removeItem(JWT_TOKEN_KEY);
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  isUserCreated(): boolean {
    return this.isUserRegistered;
  }
}
