import { MenuListResponseDto } from 'src/app/entity/dto/response/menu-list-response-dto';
import { AccountService } from 'src/app/service/common/account.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingService } from 'src/app/service/common/routing.service';
import { SearchParamsService } from 'src/app/service/common/search-params.service';
import { UrlConst } from 'src/app/const/url-const';
import { YesNoDialogData } from 'src/app/entity/yes-no-dialog-data';
import { TranslateService } from '@ngx-translate/core';
import { AppConst } from 'src/app/const/app-const';
import { MatDialog } from '@angular/material/dialog';
import { YesNoDialogComponent } from '../yes-no-dialog/yes-no-dialog.component';
import { LoadingService } from 'src/app/service/common/loading.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // メニュー
  menuListResponseDto: MenuListResponseDto[];

  constructor(
    private accountService: AccountService,
    // Usese router not ts but html.
    public router: Router,
    private routingService: RoutingService,
    private dialog: MatDialog,
    private loadingService: LoadingService,
    private searchParamsService: SearchParamsService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    // メニューデータを取得する。
    this.getMenu();
  }

  onToggleSidenav() {
    // TBD
  }

  onSignOut() {
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
  /**
   * Gets menu data in header.
   */
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
