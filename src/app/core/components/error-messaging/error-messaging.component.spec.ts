import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';
import { HttpLoaderFactory } from 'src/app/ngx-translate/ngx-translate.module';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { ErrorMessagingComponent } from './error-messaging.component';

describe('ErrorMessagingComponent', () => {
  let component: ErrorMessagingComponent;
  let fixture: ComponentFixture<ErrorMessagingComponent>;
  let errorMessagingServiceSpy: { clearMessageProperty: jasmine.Spy; getMessageProperty: jasmine.Spy };
  let translateService: TranslateService;

  beforeEach(async(() => {
    errorMessagingServiceSpy = jasmine.createSpyObj('ErrorMessagingService', [
      'clearMessageProperty',
      'getMessageProperty'
    ]);
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
      providers: [TranslateService, { provide: ErrorMessagingService, useValue: errorMessagingServiceSpy }],
      declarations: [ErrorMessagingComponent]
    }).compileComponents();
    translateService = TestBed.inject(TranslateService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#constractor', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('#ngOnInit', () => {
    it('should init', () => {
      component.ngOnInit();
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBeGreaterThan(1);
    });

    it('should error dipslay message', () => {
      const errorMessageProperty = 'errMessage.http.badRequest';
      const expectedValue = '入力情報が正しくありません。';

      translateService.setTranslation('ja', { 'errMessage.http.badRequest': expectedValue });
      translateService.use('ja');

      errorMessagingServiceSpy.getMessageProperty.and.returnValue(errorMessageProperty);
      fixture.detectChanges();

      const htmlParagraphElement: HTMLParagraphElement = fixture.debugElement.query(By.css('p')).nativeElement;
      expect(htmlParagraphElement.innerText).toEqual(expectedValue);
    });
  });
});
