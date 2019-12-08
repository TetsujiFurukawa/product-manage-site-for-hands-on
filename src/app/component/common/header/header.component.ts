import { AppConst } from 'src/app/const/app-const';
import { UrlConst } from 'src/app/const/url-const';
import { MenuListResponseDto } from 'src/app/entity/dto/response/menu-list-response-dto';
import { YesNoDialogData } from 'src/app/entity/yes-no-dialog-data';
import { AccountService } from 'src/app/service/account.service';
import { LoadingService } from 'src/app/service/common/loading.service';
import { RoutingService } from 'src/app/service/common/routing.service';
import { SearchParamsService } from 'src/app/service/common/search-params.service';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

import { YesNoDialogComponent } from '../yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // Menu response data
  menuListResponseDto: MenuListResponseDto[];

  constructor(
    private accountService: AccountService,
    private dialog: MatDialog,
    private loadingService: LoadingService,
    private searchParamsService: SearchParamsService,
    private translateService: TranslateService,
    public routingService: RoutingService
  ) { }

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
    // TBD
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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.signOut();
      }
    });
  }

  // --------------------------------------------------------------------------------
  // private methods
  // --------------------------------------------------------------------------------
  private getMenu() {
    this.accountService.getMenu()
      .subscribe(menuListResponseDto => {
        this.menuListResponseDto = menuListResponseDto;
      });
  }

  private signOut() {
    this.loadingService.startLoading();
    this.accountService.signOut().subscribe(res => {
      this.searchParamsService.removeProductListingSearchParam();
      this.loadingService.stopLoading();
      this.routingService.navigate(UrlConst.PATH_SIGN_IN);
    });
  }

}
