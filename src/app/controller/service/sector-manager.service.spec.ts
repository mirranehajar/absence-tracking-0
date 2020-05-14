import { TestBed } from '@angular/core/testing';

import { SectorManagerService } from './sector-manager.service';

describe('SectorManagerService', () => {
  let service: SectorManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectorManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
