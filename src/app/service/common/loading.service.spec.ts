import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoadingService', () => {
  let loadingService: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [LoadingService]
    });
    loadingService = TestBed.get(LoadingService);
  });

  describe('#constractor', () => {
    it('should be created', () => {
      expect(loadingService).toBeTruthy();
    });
  });

  describe('#startLoading', () => {
    it('should start loading', () => {
      loadingService.startLoading();
      expect(loadingService.isLoading).toBe(true);
    });
  });

  describe('#stopLoading', () => {
    it('should stop loading', () => {
      loadingService.stopLoading();
      expect(loadingService.isLoading).toBe(false);
    });
  });

});
