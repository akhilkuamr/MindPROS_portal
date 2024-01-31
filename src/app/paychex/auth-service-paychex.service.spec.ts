import { TestBed } from '@angular/core/testing';

import { AuthServicePaychexService } from './auth-service-paychex.service';

describe('AuthServicePaychexService', () => {
  let service: AuthServicePaychexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServicePaychexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
