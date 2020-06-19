import {
    YesNoDialogComponent
} from 'src/app/core/components/yes-no-dialog/yes-no-dialog.component';
import { YesNoDialogData } from 'src/app/core/models/yes-no-dialog-data';
import { LoadingService } from 'src/app/core/services/loading.service';
import { RoutingService } from 'src/app/core/services/routing.service';
import { AppConst } from 'src/app/pages/constants/app-const';
import { UrlConst } from 'src/app/pages/constants/url-const';
import { MenuListResponse } from 'src/app/pages/models/interfaces/responses/menu-list-response';
import { AccountService } from 'src/app/pages/services/account.service';
import { SearchParamsService } from 'src/app/pages/services/search-params.service';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // Clicks sidenav and throw event
  @Output() sidenavToggle = new EventEmitter();
  urlHome: string = UrlConst.PATH_PRODUCT_LISTING;

  // Menu response data
  menuListResponse: MenuListResponse[];

  constructor(
    private accountService: AccountService,
    private dialog: MatDialog,
    private loadingService: LoadingService,
    private searchParamsService: SearchParamsService,
    private translateService: TranslateService,
    public routingService: RoutingService
  ) {}

  /**
   * on init
   */
  ngOnInit() {
    this.getMenu();
  }

  /**
   * Clicks toggle sidenav
   */
  clickToggleSidenav() {
    this.sidenavToggle.emit();
  }

  /**
   * Clicks submenu
   */
  clickSubmenu() {
    this.searchParamsService.removeProductListingSearchParam();
  }

  /**
   * Clicks sign out
   */
  clickSignOut() {
    const dialogData: YesNoDialogData = {
      title: this.translateService.instant('menu.saveYesNoDialog.title'),
      message: this.translateService.instant('menu.saveYesNoDialog.message'),
      captionNo: this.translateService.instant('menu.saveYesNoDialog.captionNo'),
      captionYes: this.translateService.instant('menu.saveYesNoDialog.captionYes')
    };

    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      height: AppConst.YES_NO_DIALOG_HEIGHT,
      width: AppConst.YES_NO_DIALOG_WIDTH,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.signOut();
      }
    });
  }

  // --------------------------------------------------------------------------------
  // private methods
  // --------------------------------------------------------------------------------
  private getMenu() {
    this.accountService.getMenu().subscribe((menuListResponse) => {
      this.menuListResponse = menuListResponse;
    });
  }

  private signOut() {
    this.loadingService.startLoading();
    this.accountService.signOut().subscribe((res) => {
      this.searchParamsService.removeProductListingSearchParam();
      this.loadingService.stopLoading();
      this.routingService.navigate(UrlConst.PATH_SIGN_IN);
    });
  }
}
