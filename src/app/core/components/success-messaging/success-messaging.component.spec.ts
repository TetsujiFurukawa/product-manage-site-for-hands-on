import { HttpLoaderFactory } from 'src/app/app.module';
import { SuccessMessagingService } from 'src/app/core/services/success-messaging.service';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { SuccessMessagingComponent } from './success-messaging.component';

describe('SuccessMessagingComponent', () => {
  let component: SuccessMessagingComponent;
  let fixture: ComponentFixture<SuccessMessagingComponent>;
  let successMessagingServiceSpy: { clearMessageProperty: jasmine.Spy; getMessageProperty: jasmine.Spy };

  beforeEach(async(() => {
    successMessagingServiceSpy = jasmine.createSpyObj('AccountService', ['clearMessageProperty', 'getMessageProperty']);

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
      providers: [TranslateService, { provide: SuccessMessagingService, useValue: successMessagingServiceSpy }],
      declarations: [SuccessMessagingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessMessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#constractor', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
      successMessagingServiceSpy.getMessageProperty.and.callThrough();
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1, 'one call');
    });
  });
});
