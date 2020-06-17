import { TestBed } from '@angular/core/testing';

import { AuthEnsService } from './auth-ens.service';

describe('AuthEnsService', () => {
  let service: AuthEnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthEnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
