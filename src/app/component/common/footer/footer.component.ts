import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingService } from 'src/app/service/common/routing.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    public routingService: RoutingService
  ) { }

  ngOnInit() {
  }

}
