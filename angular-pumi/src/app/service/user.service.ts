import {Injectable} from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';
import {User, UserDTO} from '../model/user.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BASE_USER_ENDPOINT} from '../constants/list';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  webUrl!: string;
  userEndpoint!: string;

  constructor(private http: HttpClient) {
    this.webUrl = environment.domain;
    this.userEndpoint = this.webUrl + BASE_USER_ENDPOINT;
  }

  getUsers(): Observable<User[]> {
    let users : UserDTO[] = [];
    console.log('User Service - get users: ');
    return this.http.get<UserDTO[]>(this.userEndpoint)
      .pipe(
        map(items => {
          items.map(item => {
            users.push(new UserDTO(item.email, item.alias))
          })
          return users;
        }),
        catchError(error => {
          console.log(error);
          return of([]);
        })
      );
  }

  getUserByAlias(alias: string): Observable<User> {
    return this.http.get<UserDTO>(this.userEndpoint + 'name/' + alias)
      .pipe(
        map(response => {
          return new UserDTO(response.email, response.alias);
        }),
        catchError(error => {
          console.log(error);
          return of(new UserDTO('null', 'null'));
        })
      );
  }
}
