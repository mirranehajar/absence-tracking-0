import { TestBed } from '@angular/core/testing';

import { TypeSessionService } from './type-session.service';

describe('TypeSessionService', () => {
  let service: TypeSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
