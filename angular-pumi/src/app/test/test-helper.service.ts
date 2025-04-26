import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpTestingController} from '@angular/common/http/testing';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class TestHelperService {
  private readonly mockUsers: User[];

  constructor() {
    this.mockUsers = [
      {
        email: 'userA@example.com',
        alias: 'User A',
      },
      {
        email: 'userB@example.com',
        alias: 'User B',
      }
    ];
  }

  getMockUsers(): User[] {
    return this.mockUsers;
  }

  subscribeAndPrepareAssert(serviceMethod: Observable<any>, expected: any, done: jest.DoneCallback) {
    serviceMethod.subscribe({
      next: (data) => {
        expect(data).toEqual(expected);
        done();
      },
      error: (err) => {
        console.log('Error: ', err);
      },
    });
  }

  makeRequestAndFlush(httpTestingController: HttpTestingController,
                      webUrl: string, mockedData: any, endpoint: string, methodType: string) {
    const req = httpTestingController.expectOne(webUrl + endpoint);
    expect(req.request.method).toEqual(methodType);
    req.flush(mockedData); // Respond with mocked data
  }
}
