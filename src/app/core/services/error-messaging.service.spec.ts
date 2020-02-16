import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ErrorMessagingService } from './error-messaging.service';

describe('ErrorMessagingService', () => {
  let service: ErrorMessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorMessagingService);
  });

  describe('#constractor', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('#getMessageProperty, #setMessageProperty', () => {
    it('should return expected response', () => {
      const expectedValue = 'message';
      service.setMessageProperty(expectedValue);
      expect(service.getMessageProperty()).toEqual(expectedValue);
    });
  });

  describe('#clearMessageProperty', () => {
    it('should clear property', () => {
      const expectedValue = 'message';
      service.setMessageProperty(expectedValue);
      expect(service.getMessageProperty()).toEqual(expectedValue);
      service.clearMessageProperty();
      expect(service.getMessageProperty()).toEqual('');
    });
  });

  describe('#setupPageErrorMessageFromResponse', () => {
    it('should set property when error status is 400', () => {
      const error = { status: 400 };
      service.setupPageErrorMessageFromResponse(error);
      expect(service.getMessageProperty()).toEqual('errMessage.http.badRequest');
    });
    it('should set property when error status is 401', () => {
      const error = { status: 401 };
      service.setupPageErrorMessageFromResponse(error);
      expect(service.getMessageProperty()).toEqual('errMessage.http.unAuthorized');
    });
    it('should set property when error status is 402', () => {
      const error = { status: 404 };
      service.setupPageErrorMessageFromResponse(error);
      expect(service.getMessageProperty()).toEqual('errMessage.http.notFound');
    });

    it('should set property when error status is 500', () => {
      const error = { status: 500, error: { message: 'Duplicated key.' } };
      service.setupPageErrorMessageFromResponse(error);
      expect(service.getMessageProperty()).toEqual('errMessage.http.duplicateKeyException');
    });

    it('should set property when error status is 500', () => {
      const error = { status: 500, error: { message: 'Duplicated key.' } };
      service.setupPageErrorMessageFromResponse(error);
      expect(service.getMessageProperty()).toEqual('errMessage.http.duplicateKeyException');
    });
    it('should set property when error status is 500', () => {
      const error = { status: 500, error: { message: 'Exclusive error occurred.' } };
      service.setupPageErrorMessageFromResponse(error);
      expect(service.getMessageProperty()).toEqual('errMessage.http.exclusiveProcessingException');
    });
    it('should set property when error status is 500', () => {
      const error = { status: 500, error: { message: 'There is no stock.' } };
      service.setupPageErrorMessageFromResponse(error);
      expect(service.getMessageProperty()).toEqual('errMessage.http.outOfStockException');
    });
    it('should set property when error status is 500', () => {
      const error = { status: 500, error: { message: 'Data not found.' } };
      service.setupPageErrorMessageFromResponse(error);
      expect(service.getMessageProperty()).toEqual('errMessage.http.datNotFoundException');
    });
    it('should set property when error status is 500', () => {
      const error = { status: 500, error: { message: 'abcde' } };
      service.setupPageErrorMessageFromResponse(error);
      expect(service.getMessageProperty()).toEqual('errMessage.http.internalServerError');
    });
    it('should set property when error status is 501', () => {
      const error = { status: 501 };
      service.setupPageErrorMessageFromResponse(error);
      expect(service.getMessageProperty()).toEqual('errMessage.http.GenericError');
    });
  });
});
