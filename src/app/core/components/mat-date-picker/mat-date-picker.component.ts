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
  @Input() isBlank: boolean;
  @Input() required: boolean;
  @Input() locale: string;
  @Input() placeholder: string;
  @Input() initialValue: string;
  @Output() event = new EventEmitter<string>();

  date = new FormControl('');
  myForm = this.formBuilder.group({
    date: this.date
  });

  constructor(private formBuilder: FormBuilder, private adapter: DateAdapter<any>) {}

  ngOnInit() {
    this.adapter.setLocale(this.locale);
    // this.event.emit(this.date.value);
    this.setupDatevalue();
    this.setupValidators();
  }

  reset() {
    this.setupDatevalue();
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.event.emit(this.date.value);
  }

  private setupDatevalue() {
    if (this.isBlank) {
      this.date.setValue('');
    } else {
      this.date.setValue(new Date(this.initialValue));
    }
  }

  private setupValidators() {
    if (this.required) {
      this.date.setValidators([Validators.required]);
    }
  }
}
