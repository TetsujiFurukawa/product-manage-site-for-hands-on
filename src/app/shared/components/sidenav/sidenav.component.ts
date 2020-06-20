import { RoutingService } from 'src/app/core/services/routing.service';
import { UrlConst } from 'src/app/pages/constants/url-const';
import {
    MenuListResponseDto
} from 'src/app/pages/models/interfaces/responses/menu-list-response-dto';
import { AccountService } from 'src/app/pages/services/account.service';
import { SearchParamsService } from 'src/app/pages/services/search-params.service';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  // Menu response data
  menuListResponseDto: MenuListResponseDto[];

  constructor(
    private accountService: AccountService,
    private translateService: TranslateService,
    private searchParamsService: SearchParamsService,
    public routingService: RoutingService
  ) {}

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
    this.accountService.getMenu().subscribe((menuListResponseDto) => {
      this.menuListResponseDto = menuListResponseDto;
    });
  }
}
