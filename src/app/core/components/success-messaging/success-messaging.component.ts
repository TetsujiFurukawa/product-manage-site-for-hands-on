import { SuccessMessagingService } from 'src/app/core/services/success-messaging.service';

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-success-messaging',
  templateUrl: './success-messaging.component.html',
  styleUrls: ['./success-messaging.component.scss']
})
export class SuccessMessagingComponent implements OnInit {
  constructor(public translateService: TranslateService, public successMessagingService: SuccessMessagingService) {}

  ngOnInit() {
    this.successMessagingService.clearMessageProperty();
  }
}
