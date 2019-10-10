import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderPageService } from 'src/app/service/pages/header-page.service';
import { MenuListResponseDto } from 'src/app/entity/dto/response/menu-list-response-dto';
import { UrlConst } from 'src/app/const/url-const';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // メニュー
  menuListResponseDto: MenuListResponseDto[];

  constructor(
    private headerPageService: HeaderPageService,
    public router: Router
  ) { }

  ngOnInit() {
    if (this.router.url !== '/' && this.router.url !== '/' + UrlConst.PATH_SIGN_IN) {
      // メニューデータを取得する。
      this.getMenu();
    }
    console.log(this.router.url);
  }

  onToggleSidenav() {
    // TBD
  }

  /**
   * Gets menu data in header.
   */
  private getMenu() {
    this.headerPageService.getMenu()
      .subscribe(menuListResponseDto => { this.menuListResponseDto = menuListResponseDto; console.log(menuListResponseDto.length); });
  }
}
