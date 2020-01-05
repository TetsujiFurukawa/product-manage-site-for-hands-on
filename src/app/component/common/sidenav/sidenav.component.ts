import { UrlConst } from 'src/app/const/url-const';
import { MenuListResponseDto } from 'src/app/entity/dto/response/menu-list-response-dto';
import { AccountService } from 'src/app/service/account.service';
import { RoutingService } from 'src/app/service/common/routing.service';
import { SearchParamsService } from 'src/app/service/common/search-params.service';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  // Menu response data
  menuListResponseDto: MenuListResponseDto[];

  constructor(private accountService: AccountService, private translateService: TranslateService, private searchParamsService: SearchParamsService, public routingService: RoutingService) {}

  @Output() sidenavClose = new EventEmitter();

  urlHome: string = UrlConst.PATH_PRODUCT_LISTING;

  /**
   * on init
   */
  ngOnInit() {
    this.getMenu();
    // }
  }

  /**
   * Clicks submenu
   */
  clickSubmenu() {
    this.searchParamsService.removeProductListingSearchParam();
    this.sidenavClose.emit();
  }

  /**
   * Sidenavs closed
   */
  public sidenavClosed() {
    this.sidenavClose.emit();
  }
  // --------------------------------------------------------------------------------
  // private methods
  // --------------------------------------------------------------------------------
  private getMenu() {
    this.accountService.getMenu().subscribe(menuListResponseDto => {
      this.menuListResponseDto = menuListResponseDto;
    });
  }
}
