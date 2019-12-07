import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingService } from './service/common/routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'product-manage-site-for-hands-on';

  constructor(
    public routingService: RoutingService
  ) { }
}
