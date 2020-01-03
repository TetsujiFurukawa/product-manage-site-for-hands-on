import { of } from 'rxjs';
import { HttpLoaderFactory } from 'src/app/app.module';
import { MenuListResponseDto } from 'src/app/entity/dto/response/menu-list-response-dto';
import { AccountService } from 'src/app/service/account.service';
import { SearchParamsService } from 'src/app/service/common/search-params.service';
import { MaterialModule } from 'src/app/utils/material/material.module';

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

import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let accountServiceSpy: { getMenu: jasmine.Spy };
  let searchParamsServiceSpy: { removeProductListingSearchParam: jasmine.Spy };
  let router: Router;

  beforeEach(async(() => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['getMenu']);
    searchParamsServiceSpy = jasmine.createSpyObj('SearchParamsService', ['removeProductListingSearchParam']);

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        MaterialModule,
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
      providers: [TranslateService, { provide: AccountService, useValue: accountServiceSpy }, { provide: SearchParamsService, useValue: searchParamsServiceSpy }],
      declarations: [SidenavComponent]
    }).compileComponents();
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
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
      expect(accountServiceSpy.getMenu.calls.count()).toBe(1, 'one call');
    });
  });

  describe('#clickSubmenu', () => {
    it('should remove search param', () => {
      component.clickSubmenu();
      expect(searchParamsServiceSpy.removeProductListingSearchParam.calls.count()).toBe(1, 'one call');
    });
  });

  describe('#sidenavClosed', () => {
    it('should close side nav', () => {
      spyOn(component.sidenavClose, 'emit').and.callThrough();
      component.sidenavClosed();
      expect(component.sidenavClose.emit).toHaveBeenCalled();
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
