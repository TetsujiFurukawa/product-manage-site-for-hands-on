import { TestBed } from '@angular/core/testing';

import { SessionStrageService } from './session-strage.service';

describe('SessionStrageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionStrageService = TestBed.get(SessionStrageService);
    expect(service).toBeTruthy();
  });
});
