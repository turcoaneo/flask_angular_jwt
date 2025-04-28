import { TestBed } from '@angular/core/testing';

import { TestHelperService } from './test-helper.service';

describe('TestHelperService', () => {
  let service: TestHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
