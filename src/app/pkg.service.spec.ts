import { TestBed } from '@angular/core/testing';

import { PkgService } from './pkg.service';

describe('PkgService', () => {
  let service: PkgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PkgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
