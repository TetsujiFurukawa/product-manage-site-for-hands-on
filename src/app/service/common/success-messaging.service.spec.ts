import { TestBed } from '@angular/core/testing';

import { SuccessMessagingService } from './success-messaging.service';

xdescribe('SuccessMessagingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuccessMessagingService = TestBed.get(SuccessMessagingService);
    expect(service).toBeTruthy();
  });
});
