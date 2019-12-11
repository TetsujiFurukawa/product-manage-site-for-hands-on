import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ErrorMessagingService } from './error-messaging.service';

describe('ErrorMessagingService', () => {
  let errorMessagingService: ErrorMessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ErrorMessagingService]
    });
    errorMessagingService = TestBed.get(ErrorMessagingService);
  });

  describe('#constractor', () => {
    it('should be created', () => {
      expect(errorMessagingService).toBeTruthy();
    });
  });

  describe('#getMessageProperty, #setMessageProperty', () => {
    it('should return expected response', () => {
      const expectedValue = 'message';
      errorMessagingService.setMessageProperty(expectedValue);
      expect(errorMessagingService.getMessageProperty()).toEqual(expectedValue);
    });
  });

  describe('#clearMessageProperty', () => {
    it('should clear property', () => {
      const expectedValue = 'message';
      errorMessagingService.setMessageProperty(expectedValue);
      expect(errorMessagingService.getMessageProperty()).toEqual(expectedValue);
      errorMessagingService.clearMessageProperty();
      expect(errorMessagingService.getMessageProperty()).toEqual('');
    });
  });

  describe('#setupPageErrorMessageFromResponse', () => {
    it('should set property when error status is 400', () => {
      const error = { status: 400 };
      errorMessagingService.setupPageErrorMessageFromResponse(error);
      expect(errorMessagingService.getMessageProperty()).toEqual('errMessage.http.badRequest');
    });
    it('should set property when error status is 401', () => {
      const error = { status: 401 };
      errorMessagingService.setupPageErrorMessageFromResponse(error);
      expect(errorMessagingService.getMessageProperty()).toEqual('errMessage.http.unAuthorized');
    });
    it('should set property when error status is 402', () => {
      const error = { status: 404 };
      errorMessagingService.setupPageErrorMessageFromResponse(error);
      expect(errorMessagingService.getMessageProperty()).toEqual('errMessage.http.notFound');
    });

    it('should set property when error status is 500', () => {
      const error = { status: 500, error: { message: 'Duplicated key.' } };
      errorMessagingService.setupPageErrorMessageFromResponse(error);
      expect(errorMessagingService.getMessageProperty()).toEqual('errMessage.http.duplicateKeyException');
    });

    it('should set property when error status is 500', () => {
      const error = { status: 500, error: { message: 'Duplicated key.' } };
      errorMessagingService.setupPageErrorMessageFromResponse(error);
      expect(errorMessagingService.getMessageProperty()).toEqual('errMessage.http.duplicateKeyException');
    });
    it('should set property when error status is 500', () => {
      const error = { status: 500, error: { message: 'Exclusive error occurred.' } };
      errorMessagingService.setupPageErrorMessageFromResponse(error);
      expect(errorMessagingService.getMessageProperty()).toEqual('errMessage.http.exclusiveProcessingException');
    });
    it('should set property when error status is 500', () => {
      const error = { status: 500, error: { message: 'There is no stock.' } };
      errorMessagingService.setupPageErrorMessageFromResponse(error);
      expect(errorMessagingService.getMessageProperty()).toEqual('errMessage.http.outOfStockException');
    });
    it('should set property when error status is 500', () => {
      const error = { status: 500, error: { message: 'Data not found.' } };
      errorMessagingService.setupPageErrorMessageFromResponse(error);
      expect(errorMessagingService.getMessageProperty()).toEqual('errMessage.http.datNotFoundException');
    });
    it('should set property when error status is 500', () => {
      const error = { status: 500, error: { message: 'abcde' } };
      errorMessagingService.setupPageErrorMessageFromResponse(error);
      expect(errorMessagingService.getMessageProperty()).toEqual('errMessage.http.internalServerError');
    });
    it('should set property when error status is 501', () => {
      const error = { status: 501 };
      errorMessagingService.setupPageErrorMessageFromResponse(error);
      expect(errorMessagingService.getMessageProperty()).toEqual('errMessage.http.GenericError');
    });
  });
});
