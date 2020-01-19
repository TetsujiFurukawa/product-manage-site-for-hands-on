import { User } from 'src/app/pages/models/user';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { AccountService } from '../../pages/services/account.service';
import { HttpLoaderFactory } from '../shared.module';
import { TitleI18Service } from './title-i18.service';

describe('TitleI18Service', () => {
  let service: TitleI18Service;
  let translateService: TranslateService;
  let http: HttpTestingController;
  let accountService: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [TranslateService, AccountService]
    });
    service = TestBed.get(TitleI18Service);
    translateService = TestBed.get(TranslateService);
    http = TestBed.get(HttpTestingController);
    accountService = TestBed.get(AccountService);
  });

  describe('#constractor', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('#setTitle', () => {
    it('should set property', () => {
      const subTitle = 'subTitle';
      const expectedUser = new User();
      expectedUser.userLanguage = 'ja';
      spyOn(accountService, 'getUser').and.returnValue(expectedUser);

      translateService.setTranslation('ja', { 'title.subTitle': '画面名', 'title.system': '【テストサイト】' });
      translateService.use('ja');

      service.setTitle(subTitle);
      expect(service.title.getTitle()).toEqual('【テストサイト】画面名');
    });

    it('should set property', () => {
      const subTitle = 'subTitle';
      spyOn(accountService, 'getUser').and.returnValue(null);

      service.setTitle(subTitle);
      expect(service.title.getTitle()).toEqual('title.system' + 'title.' + subTitle);
    });
  });
});
