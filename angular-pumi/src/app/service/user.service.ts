import {Injectable} from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';
import {User, UserDTO} from '../model/user.model';
import {HttpClient} from '@angular/common/http';
import {WEB_URL} from '../constants/list';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  webUrl!: string;

  constructor(private http: HttpClient) {
    this.webUrl = WEB_URL;
  }

  getUsers(): Observable<User[]> {
    let users : UserDTO[] = [];
    console.log('User Service - get users: ');
    return this.http.get<UserDTO[]>(this.webUrl + '/user')
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
    console.log('User Service - get user by alias: ');
    return this.http.get<UserDTO>(this.webUrl + '/user/' + alias)
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
