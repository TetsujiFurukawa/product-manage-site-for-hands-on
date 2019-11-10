import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-mat-date-picker',
  templateUrl: './mat-date-picker.component.html',
  styleUrls: ['./mat-date-picker.component.scss']
})
export class MatDatePickerComponent implements OnInit {

  @Input() locale: string;
  @Input() placeholder: string;
  @Input() required: true;
  @Output() event = new EventEmitter<string>();

  date = new FormControl(new Date(), [Validators.required]);

  myForm = this.formBuilder.group({
    date: this.date,
  });

  constructor(
    private formBuilder: FormBuilder,
    private adapter: DateAdapter<any>
  ) { }

  ngOnInit() {
    this.adapter.setLocale(this.locale);
    this.event.emit(this.date.value);
    console.log('required:' + this.required);

  }

  reset() {
    this.date.setValue(new Date());
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.event.emit(this.date.value);
  }

}
