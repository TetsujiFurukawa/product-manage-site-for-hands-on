import { HttpLoaderFactory } from 'src/app/app.module';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { MatDatePickerComponent } from './mat-date-picker.component';

describe('MatDatePickerComponent', () => {
  let component: MatDatePickerComponent;
  let fixture: ComponentFixture<MatDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [FormBuilder, NativeDateAdapter],
      declarations: [MatDatePickerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#constractor', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('#ngOnInit', () => {
    it('should set required validator', () => {
      component.date.clearValidators();
      component.required = true;
      component.ngOnInit();
      expect(component).toBeTruthy();
    });
    it('should not set required validator', () => {
      component.required = false;
      component.ngOnInit();
      expect(component).toBeTruthy();
    });
  });

  describe('#reset', () => {
    it('should clear date', () => {
      component.isBlank = true;
      component.reset();
      expect(component.date.value).toEqual('');
    });
    it('should create new date', () => {
      component.isBlank = false;
      component.reset();
      expect(component.date.value).not.toEqual('');
    });
  });

  describe('#addEvent', () => {
    it('should clear date', () => {
      spyOn(component.event, 'emit').and.callThrough();

      const nativeElement = fixture.nativeElement;
      const button = nativeElement.querySelector('input');
      button.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(component.event.emit).toHaveBeenCalledWith(component.date.value);
    });
  });
});
