import { HttpLoaderFactory } from 'src/app/ngx-translate/ngx-translate.module';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { MatPaginatorI18nService } from './mat-paginator-i18n.service';

describe('MatPaginatorI18nService', () => {
  let service: MatPaginatorI18nService;
  let translate: TranslateService;
  let http: HttpTestingController;

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
      providers: [TranslateService]
    });
    service = TestBed.inject(MatPaginatorI18nService);
    translate = TestBed.inject(TranslateService);
    http = TestBed.inject(HttpTestingController);
  });

  describe('#constractor', () => {
    it('should be created', () => {
      spyOn(translate.onLangChange, 'emit').and.callThrough();
      expect(service).toBeTruthy();
      expect(service.getAndInitTranslations).not.toBeNull();

      translate.onLangChange.emit();
      expect(translate.onLangChange.emit).toHaveBeenCalled();
    });
  });

  describe('#getRangeLabel', () => {
    it('should return 0,0,0', () => {
      expect(service.getRangeLabel(0, 0, 0)).toBe('0 / 0');
    });
    it('should return 0,0,1', () => {
      expect(service.getRangeLabel(0, 0, 1)).toBe('0 / 1');
    });
    it('should return 1,10,1', () => {
      expect(service.getRangeLabel(1, 10, 1)).toBe('11 – 20 / 1');
    });
    it('should return 0,10,1', () => {
      expect(service.getRangeLabel(0, 10, 1)).toBe('1 – 1 / 1');
    });
    it('should return 0,50,1', () => {
      expect(service.getRangeLabel(0, 50, 1)).toBe('1 – 1 / 1');
    });
    it('should return 1,10,20', () => {
      expect(service.getRangeLabel(1, 10, 20)).toBe('11 – 20 / 20');
    });
    it('should return 1,50,100', () => {
      expect(service.getRangeLabel(1, 50, 100)).toBe('51 – 100 / 100');
    });
  });

  describe('#getAndInitTranslations', () => {
    it('should set pagenator labels', () => {
      service.getAndInitTranslations();
      expect(service.itemsPerPageLabel).toBe('Items per page:');
      expect(service.nextPageLabel).toBe('Next page');
      expect(service.previousPageLabel).toBe('Previous page');
      expect(service.firstPageLabel).toBe('First page');
      expect(service.lastPageLabel).toBe('Last page');
    });
  });
});
