import { MenuListResponseDto } from 'src/app/entity/dto/response/menu-list-response-dto';
import { AccountService } from 'src/app/service/common/account.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    public router: Router
  ) { }

  ngOnInit() {
    // メニューデータを取得する。
    this.getMenu();
  }

  onToggleSidenav() {
    // TBD
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
}
