import { Component } from '@angular/core';

import { RoutingService } from './core/services/routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'product-manage-site-for-hands-on';

  constructor(public routingService: RoutingService) {}
}
