import { TestBed } from '@angular/core/testing';

import { AuthEtuService } from './auth-etu.service';

describe('AuthEtuService', () => {
  let service: AuthEtuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthEtuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
