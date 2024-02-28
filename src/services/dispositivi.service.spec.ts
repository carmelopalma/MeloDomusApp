import { TestBed } from '@angular/core/testing';

import { DispositiviService } from './dispositivi.service';

describe('DispositiviService', () => {
  let service: DispositiviService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DispositiviService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
