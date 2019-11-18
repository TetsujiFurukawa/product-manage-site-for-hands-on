import { Component, OnInit } from '@angular/core';
import { SuccessMessagingService } from 'src/app/service/common/success-messaging.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-success-messaging',
  templateUrl: './success-messaging.component.html',
  styleUrls: ['./success-messaging.component.scss']
})
export class SuccessMessagingComponent implements OnInit {

  constructor(
    public translateService: TranslateService,
    public successMessagingService: SuccessMessagingService
  ) { }

  ngOnInit() {
    this.successMessagingService.clearMessageProperty();
  }

}
