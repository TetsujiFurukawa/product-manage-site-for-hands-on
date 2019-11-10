import { Component, OnInit } from '@angular/core';
import { SuccessMessagingService } from 'src/app/service/common/success-messaging.service';

@Component({
  selector: 'app-success-messaging',
  templateUrl: './success-messaging.component.html',
  styleUrls: ['./success-messaging.component.scss']
})
export class SuccessMessagingComponent implements OnInit {

  constructor(
    public successMessagingService: SuccessMessagingService
  ) { }

  ngOnInit() {
    this.successMessagingService.clearMessage();
  }

}
