import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-mat-date-picker',
  templateUrl: './mat-date-picker.component.html',
  styleUrls: ['./mat-date-picker.component.scss']
})
export class MatDatePickerComponent implements OnInit {
  @Input() placeholder: string;
  @Input() initialValue: string;
  @Input() required: boolean;
  @Input() locale: string;
  @Output() event = new EventEmitter<string>();

  date = new FormControl('');
  myForm = this.formBuilder.group({
    date: this.date
  });

  constructor(private formBuilder: FormBuilder, private adapter: DateAdapter<any>) {}

  ngOnInit(): void {
    this.adapter.setLocale(this.locale);
    this.setupDateValue();
    this.setupValidators();
  }

  reset(): void {
    this.setupDateValue();
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.event.emit(this.date.value);
  }

  private setupDateValue(): void {
    if (this.initialValue) {
      this.date.setValue(new Date(this.initialValue));
    } else {
      this.date.setValue('');
    }
  }

  private setupValidators(): void {
    if (this.required) {
      this.date.setValidators([Validators.required]);
    }
  }
}
