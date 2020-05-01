import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-error-messaging',
  templateUrl: './error-messaging.component.html',
  styleUrls: ['./error-messaging.component.scss']
})
export class ErrorMessagingComponent implements OnInit {
  constructor(public translateService: TranslateService, public errorMessagingService: ErrorMessagingService) {}

  ngOnInit(): void {
    this.errorMessagingService.clearMessageProperty();
  }
}
