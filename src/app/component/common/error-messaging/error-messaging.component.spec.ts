import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessagingComponent } from './error-messaging.component';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ErrorMessagingService } from 'src/app/service/common/error-messaging.service';
import { By } from '@angular/platform-browser';

describe('ErrorMessagingComponent', () => {
  let component: ErrorMessagingComponent;
  let fixture: ComponentFixture<ErrorMessagingComponent>;
  let errorMessagingServiceSpy: { clearMessageProperty: jasmine.Spy, getMessageProperty: jasmine.Spy };

  beforeEach(async(() => {
    errorMessagingServiceSpy = jasmine.createSpyObj('ErrorMessagingService', ['clearMessageProperty', 'getMessageProperty']);
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
      providers: [TranslateService,
        { provide: ErrorMessagingService, useValue: errorMessagingServiceSpy }],
      declarations: [ErrorMessagingComponent]
    })
      .compileComponents();

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
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBeGreaterThan(1, 'clearMessageProperty');
    });

    it('should error dipslay message', () => {
      const errorMessage = 'error';
      errorMessagingServiceSpy.getMessageProperty.and.returnValue(errorMessage);
      fixture.detectChanges();

      const debugElement: DebugElement = fixture.debugElement;
      const queriedElement = debugElement.query(By.css('p'));
      const hTMLParagraphElement: HTMLParagraphElement = queriedElement.nativeElement;
      expect(hTMLParagraphElement.innerText).toEqual(errorMessage);

    });
  });
});
