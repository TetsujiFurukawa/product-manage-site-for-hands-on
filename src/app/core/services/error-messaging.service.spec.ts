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
    const parameters = [
      {
        descriptuion: 'should set property when error status is 400',
        error: { status: 400 },
        result: 'errMessage.http.badRequest'
      },
      {
        descriptuion: 'should set property when error status is 401',
        error: { status: 401 },
        result: 'errMessage.http.unAuthorized'
      },
      {
        descriptuion: 'should set property when error status is 404',
        error: { status: 404 },
        result: 'errMessage.http.notFound'
      },
      {
        descriptuion: 'should set property when error status is 500 _ Duplicated key.',
        error: { status: 500, error: { message: 'Duplicated key.' } },
        result: 'errMessage.http.duplicateKeyException'
      },
      {
        descriptuion: 'should set property when error status is 500 _ Exclusive error occurred.',
        error: { status: 500, error: { message: 'Exclusive error occurred.' } },
        result: 'errMessage.http.exclusiveProcessingException'
      },
      {
        descriptuion: 'should set property when error status is 500 _ There is no stock.',
        error: { status: 500, error: { message: 'There is no stock.' } },
        result: 'errMessage.http.outOfStockException'
      },
      {
        descriptuion: 'should set property when error status is 500 _ Data not found.',
        error: { status: 500, error: { message: 'Data not found.' } },
        result: 'errMessage.http.datNotFoundException'
      },
      {
        descriptuion: 'should set property when error status is 500 _ Another message',
        error: { status: 500, error: { message: 'Another message' } },
        result: 'errMessage.http.internalServerError'
      },
      {
        descriptuion: 'should set property when error status is 501',
        error: { status: 501 },
        result: 'errMessage.http.GenericError'
      }
    ];

    parameters.forEach((parameter) => {
      it(parameter.descriptuion, () => {
        service.setupPageErrorMessageFromResponse(parameter.error);
        expect(service.getMessageProperty()).toEqual(parameter.result);
      });
    });
  });
});
