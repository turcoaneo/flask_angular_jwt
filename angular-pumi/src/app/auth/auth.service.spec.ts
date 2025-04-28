import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {TestHelperService} from '../test/test-helper.service';
import {UserService} from '../service/user.service';

describe('AuthService', () => {
  let helper: TestHelperService;
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService, provideHttpClient(), provideHttpClientTesting()]
    });
    helper = TestBed.inject(TestHelperService);
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true on signup', (done) => {
    let mockUsers = helper.getMockUsers();
    let serviceMethod = service.signUp(
      {email: mockUsers[0].email, alias: mockUsers[0].alias, password: 'signUpPass'});
    let expected = true;
    helper.subscribeAndPrepareAssert(serviceMethod, expected, done);
    helper.makeRequestAndFlush(httpTestingController, service.webUrl, mockUsers, '/user/', 'POST');
  });

  it('should return true on signin', (done) => {
    let mockUsers = helper.getMockUsers();
    let serviceMethod = service.login({email: mockUsers[0].email, password: 'signInPass'});
    let expected = true;
    helper.subscribeAndPrepareAssert(serviceMethod, expected, done);
    let endpoint = '/auth/login';
    let mockedResponse = {expires_minutes: 1, token: 'token'};
    helper.makeRequestAndFlush(httpTestingController, service.webUrl, mockedResponse, endpoint, 'POST');
  });

  it('should return true on token refreshing', (done) => {
    let serviceMethod = service.refreshJwtToken();
    let expected = true;
    helper.subscribeAndPrepareAssert(serviceMethod, expected, done);
    let endpoint = '/auth/token';
    let mockedResponse = {expires_minutes: 1, token: 'token'};
    helper.makeRequestAndFlush(httpTestingController, service.webUrl, mockedResponse, endpoint, 'GET');
  });
});
