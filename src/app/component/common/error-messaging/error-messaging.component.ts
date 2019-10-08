import { Component, OnInit } from '@angular/core';
import { ErrorMessagingService } from 'src/app/service/common/error-messaging.service';

@Component({
  selector: 'app-error-messaging',
  templateUrl: './error-messaging.component.html',
  styleUrls: ['./error-messaging.component.scss']
})
export class ErrorMessagingComponent implements OnInit {

  constructor(
    public errorMessagingService: ErrorMessagingService
  ) { }

  ngOnInit() {
    this.errorMessagingService.clearErrorMessage();
  }

}
