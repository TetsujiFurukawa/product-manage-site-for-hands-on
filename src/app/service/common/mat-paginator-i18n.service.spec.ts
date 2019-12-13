import { HttpLoaderFactory } from 'src/app/app.module';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { MatPaginatorI18nService } from './mat-paginator-i18n.service';

describe('MatPaginatorI18nService', () => {
  let matPaginatorI18nService: MatPaginatorI18nService;
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
      providers: [MatPaginatorI18nService, TranslateService]
    });
    matPaginatorI18nService = TestBed.get(MatPaginatorI18nService);
    translate = TestBed.get(TranslateService);
    http = TestBed.get(HttpTestingController);
  });

  describe('#constractor', () => {
    it('should be created', () => {
      expect(matPaginatorI18nService).toBeTruthy();
      expect(matPaginatorI18nService.getAndInitTranslations).not.toBeNull();
      translate.onLangChange.emit();
      expect(translate.onLangChange.emit).toHaveBeenCalled();
    });
  });

  describe('#getRangeLabel', () => {
    it('should return 1,0,1', () => {
      expect(matPaginatorI18nService.getRangeLabel(0, 0, 1)).toBe('0 / 1');
    });
    it('should return 1,1,0', () => {
      expect(matPaginatorI18nService.getRangeLabel(0, 0, 0)).toBe('0 / 0');
    });
    it('should return 0,10,1', () => {
      expect(matPaginatorI18nService.getRangeLabel(0, 10, 1)).toBe('1 – 1 / 1');
    });
    it('should return 0,50,1', () => {
      expect(matPaginatorI18nService.getRangeLabel(0, 50, 1)).toBe('1 – 1 / 1');
    });
    it('should return 1,10,20', () => {
      expect(matPaginatorI18nService.getRangeLabel(1, 10, 20)).toBe('11 – 20 / 20');
    });
    it('should return 1,50,100', () => {
      expect(matPaginatorI18nService.getRangeLabel(1, 50, 100)).toBe('51 – 100 / 100');
    });
  });

  describe('#getAndInitTranslations', () => {
    it('should set pagenator labels', () => {
      matPaginatorI18nService.getAndInitTranslations();
      expect(matPaginatorI18nService.itemsPerPageLabel).toBe('Items per page:');
      expect(matPaginatorI18nService.nextPageLabel).toBe('Next page');
      expect(matPaginatorI18nService.previousPageLabel).toBe('Previous page');
      expect(matPaginatorI18nService.firstPageLabel).toBe('First page');
      expect(matPaginatorI18nService.lastPageLabel).toBe('Last page');
    });
  });
});
