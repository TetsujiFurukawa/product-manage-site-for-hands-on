import { HttpLoaderFactory } from 'src/app/ngx-translate/ngx-translate.module';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { MatDatepickerComponent } from './mat-datepicker.component';

describe('MatDatepickerComponent', () => {
  let component: MatDatepickerComponent;
  let fixture: ComponentFixture<MatDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
      declarations: [MatDatepickerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatDatepickerComponent);
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
      component.initialValue = '';
      component.reset();
      expect(component.date.value).toEqual('');
    });
    it('should create new date', () => {
      component.initialValue = '2002/1/1';
      component.reset();
      expect(component.date.value).not.toEqual('');
    });
  });

  describe('#addEvent', () => {
    it('should clear date', () => {
      spyOn(component.event, 'emit').and.callThrough();

      const button = fixture.debugElement.query(By.css('input')).nativeElement;
      button.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(component.event.emit).toHaveBeenCalledWith(component.date.value);
    });
  });
});
