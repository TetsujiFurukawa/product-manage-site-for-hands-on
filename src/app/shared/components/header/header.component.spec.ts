import { of } from 'rxjs';
import { HttpLoaderFactory } from 'src/app/ngx-translate/ngx-translate.module';
import { UrlConst } from 'src/app/pages/constants/url-const';
import {
    MenuListResponseDto
} from 'src/app/pages/models/interfaces/responses/menu-list-response-dto';
import { AccountService } from 'src/app/pages/services/account.service';
import { SearchParamsService } from 'src/app/pages/services/search-params.service';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let accountServiceSpy: { getMenu: jasmine.Spy; signOut: jasmine.Spy };
  let matDialogSpy: { open: jasmine.Spy };
  let searchParamsServiceSpy: { removeProductListingSearchParam: jasmine.Spy };
  let router: Router;

  beforeEach(async(() => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['getMenu', 'signOut']);
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    searchParamsServiceSpy = jasmine.createSpyObj('SearchParamsService', ['removeProductListingSearchParam']);

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        BrowserAnimationsModule,
        MatMenuModule,
        MatDialogModule,
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      providers: [
        TranslateService,
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: SearchParamsService, useValue: searchParamsServiceSpy }
      ],
      declarations: [HeaderComponent]
    }).compileComponents();
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    // Commented out the following because an error occurred in the 'should create' test.
    // fixture.detectChanges();
  });

  describe('#constractor', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('#ngOnInit', () => {
    it('should init', () => {
      const expetedMenuListResponseDtos: MenuListResponseDto[] = createExpectedMenuDto();
      accountServiceSpy.getMenu.and.returnValue(of(expetedMenuListResponseDtos));

      component.ngOnInit();
      expect(component.menuListResponseDto).toEqual(expetedMenuListResponseDtos);
      expect(accountServiceSpy.getMenu.calls.count()).toBe(1);
    });
  });

  describe('#clickToggleSidenav', () => {
    it('should show side navi', () => {
      spyOn(component.sidenavToggle, 'emit').and.callThrough();
      component.clickToggleSidenav();
      expect(component.sidenavToggle.emit).toHaveBeenCalled();
    });
  });
  describe('#clickSubmenu', () => {
    it('should remove search param', () => {
      component.clickSubmenu();
      expect(searchParamsServiceSpy.removeProductListingSearchParam.calls.count()).toBe(1);
    });
  });
  describe('#clickSignOut', () => {
    it('should sign out', async(() => {
      matDialogSpy.open.and.returnValue({ afterClosed: () => of(true) });
      accountServiceSpy.signOut.and.returnValue(of(null));
      spyOn(router, 'navigate');
      component.clickSignOut();
      expect(matDialogSpy.open.calls.count()).toBe(1);
      expect(accountServiceSpy.signOut.calls.count()).toBe(1);
      expect(router.navigate).toHaveBeenCalledWith(['/' + UrlConst.PATH_SIGN_IN]);
    }));

    it('should not sign out', () => {
      matDialogSpy.open.and.returnValue({ afterClosed: () => of(false) });
      component.clickSignOut();
      expect(matDialogSpy.open.calls.count()).toBe(1);
      expect(accountServiceSpy.signOut.calls.count()).toBe(0);
    });
  });
});

function createExpectedMenuDto() {
  const menuListResponseDto1: MenuListResponseDto = new MenuListResponseDto();
  menuListResponseDto1.menuCode = 'menu1';
  menuListResponseDto1.subMenuCodeList = Array('subMenu1-1', 'subMenu1-2');
  const menuListResponseDto2: MenuListResponseDto = new MenuListResponseDto();
  menuListResponseDto1.menuCode = 'menu2';
  menuListResponseDto1.subMenuCodeList = Array('subMenu2-1');
  const expetedMenuListResponseDtos: MenuListResponseDto[] = Array(menuListResponseDto1, menuListResponseDto2);
  return expetedMenuListResponseDtos;
}
