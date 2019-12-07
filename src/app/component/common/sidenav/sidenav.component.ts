import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingService } from 'src/app/service/common/routing.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(
    public routingService: RoutingService,
  ) { }

  ngOnInit() {
  }

}
