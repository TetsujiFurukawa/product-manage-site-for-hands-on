import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { AccountService } from '../service/account.service';
import { RoutingService } from '../service/common/routing.service';
import { AppConst } from '../const/app-const';
import { UrlConst } from '../const/url-const';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private accountService: AccountService,
    private routingService: RoutingService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.getMenu().pipe(
      map(menuListResponseDto => {
        if (menuListResponseDto === null || this.accountService.getMenu === undefined) {
          this.routingService.navigate(UrlConst.PATH_SIGN_IN);
          return false;
        }
        return true;
      })
    );
  }
}
