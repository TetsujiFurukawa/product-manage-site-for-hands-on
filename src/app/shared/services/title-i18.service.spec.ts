import { HttpLoaderFactory } from 'src/app/ngx-translate/ngx-translate.module';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { TitleI18Service } from './title-i18.service';

describe('TitleI18Service', () => {
  let service: TitleI18Service;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
      providers: [TranslateService]
    });
    service = TestBed.inject(TitleI18Service);
    translateService = TestBed.inject(TranslateService);
  });

  describe('#constractor', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('#setTitle', () => {
    it('should set property', () => {
      const subTitle = 'subTitle';
      const expectedTitle = 'テストサイト名';
      const expectedSubTitle = 'テスト画面名';

      translateService.setTranslation('ja', { 'title.system': expectedTitle, 'title.subTitle': expectedSubTitle });
      translateService.use('ja');

      service.setTitle(subTitle);
      expect(service.title.getTitle()).toEqual(expectedTitle + expectedSubTitle);
    });
  });
});
