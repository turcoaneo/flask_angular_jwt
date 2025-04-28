import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {TestHelperService} from '../test/test-helper.service';
import {User, UserDTO} from '../model/user.model';

describe('UserService', () => {
  let helper: TestHelperService;
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService, provideHttpClient(), provideHttpClientTesting()]
    });
    helper = TestBed.inject(TestHelperService);
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected users data (HttpClient called once)', (done) => {
    let mockUsers = helper.getMockUsers();
    let serviceMethod = service.getUsers();
    let expected: User[] = [mockUsers[0], mockUsers[1]];
    helper.subscribeAndPrepareAssert(serviceMethod, expected, done);
    helper.makeRequestAndFlush(httpTestingController, service.webUrl, mockUsers, '/user/', 'GET');
  });

  it('should return expected one user data (HttpClient called once)', (done) => {
    let mockUsers = helper.getMockUsers();
    let serviceMethod = service.getUserByAlias(mockUsers[0].alias);
    let expected: UserDTO = UserDTO.createUserDTO(mockUsers[0]);
    helper.subscribeAndPrepareAssert(serviceMethod, expected, done);
    let endpoint = '/user/name/User A';
    helper.makeRequestAndFlush(httpTestingController, service.webUrl, mockUsers[0], endpoint, 'GET');
  });
});
