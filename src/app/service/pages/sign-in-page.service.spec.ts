import { TestBed } from '@angular/core/testing';

import { SignInPageService } from './sign-in-page.service';

describe('SignInPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignInPageService = TestBed.get(SignInPageService);
    expect(service).toBeTruthy();
  });
});
