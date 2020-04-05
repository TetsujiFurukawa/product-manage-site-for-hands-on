import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';
import { HttpLoaderFactory } from 'src/app/ngx-translate/ngx-translate.module';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { ErrorMessagingComponent } from './error-messaging.component';

describe('ErrorMessagingComponent', () => {
  let component: ErrorMessagingComponent;
  let fixture: ComponentFixture<ErrorMessagingComponent>;
  let errorMessagingServiceSpy: { clearMessageProperty: jasmine.Spy; getMessageProperty: jasmine.Spy };

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
      const errorMessage = 'error';
      errorMessagingServiceSpy.getMessageProperty.and.returnValue(errorMessage);
      fixture.detectChanges();
      const nativeElement = fixture.nativeElement;
      const hTMLParagraphElement: HTMLParagraphElement = nativeElement.querySelector('p');
      expect(hTMLParagraphElement.innerText).toEqual(errorMessage);
    });
  });
});
