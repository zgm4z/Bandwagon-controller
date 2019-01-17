import {TestBed} from '@angular/core/testing';

import {HttpVpsService} from './http-vps.service';

describe('HttpVpsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpVpsService = TestBed.get(HttpVpsService);
    expect(service).toBeTruthy();
  });
});
