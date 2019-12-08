import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import { ErrorMessagingService } from './common/error-messaging.service';

describe('AccountService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let accountService: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [AccountService, ErrorMessagingService]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    accountService = TestBed.get(AccountService);
  });

  it('should be created', () => {
    const service: AccountService = TestBed.get(AccountService);
    expect(service).toBeTruthy();
  });

  // it('should be created', () => {
  //   const expectedCompanyDto: CompanyDto = {
  //     companySeq: BigInt('1'),
  //     companyName: 'companyName',
  //     companyKana: 'companyKana',
  //     companyPostalCode: 'companyPostalCode',
  //     companyAddress1: 'companyAddress1',
  //     companyAddress2: 'companyAddress2',
  //     companyAddress3: 'companyAddress3',
  //     companyPhoneNumber: 'companyPhoneNumber',
  //     personInChargeLastName: 'personInChargeLastName',
  //     personInChargeFirstName: 'personInChargeFirstName',
  //     departmentInCharge1: 'departmentInCharge1',
  //     departmentInCharge2: 'departmentInCharge2',
  //     departmentInCharge3: 'departmentInCharge3',
  //     personInChargeEmailAddress: 'personInChargeEmailAddress',
  //     deleted: false,
  //     createUser: 'createUser',
  //     createTime: new Date(),
  //     updateUser: 'updateUser',
  //     updateTime: new Date()
  //   };

  //   httpClientSpy.post.and.returnValue(asyncData(expectedCompanyDto));

  //   companyService
  //     .createCompany(null)
  //     .subscribe(companyDto => expect(companyDto).toEqual(expectedCompanyDto, 'expected companyDto'), fail);
  //   expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  // });

  // it('can test HttpClient.get', () => {
  //   const testData: Data = { name: 'Test Data' };

  //   // Make an HTTP GET request
  //   httpClient.get<Data>(testUrl).subscribe(data =>
  //     // When observable resolves, result should match test data
  //     expect(data).toEqual(testData)
  //   );

  //   // The following `expectOne()` will match the request's URL.
  //   // If no requests or multiple requests matched that URL
  //   // `expectOne()` would throw.
  //   const req = httpTestingController.expectOne('/data');

  //   // Assert that the request is a GET.
  //   expect(req.request.method).toEqual('GET');

  //   // Respond with mock data, causing Observable to resolve.
  //   // Subscribe callback asserts that correct data was returned.
  //   req.flush(testData);

  //   // Finally, assert that there are no outstanding requests.
  //   httpTestingController.verify();
  // });
});
