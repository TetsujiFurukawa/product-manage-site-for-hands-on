import { TestBed } from '@angular/core/testing';

import { ErrorMessagingService } from './error-messaging.service';

xdescribe('ErrorMessagingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorMessagingService = TestBed.get(ErrorMessagingService);
    expect(service).toBeTruthy();
  });
});
