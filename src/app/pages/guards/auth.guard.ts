import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { RoutingService } from '../../core/services/routing.service';
import { UrlConst } from '../constants/url-const';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private accountService: AccountService, private routingService: RoutingService) {}

  /**
   * Determines whether activate can
   * @param next Activated route snapshot
   * @param state Router state snapshot
   * @returns Whether activate can
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.accountService.getAvailablePages().pipe(
      map((availablePages) => {
        if (availablePages === null) {
          return this.cantActivate();
        }
        const filteredMenu = availablePages.filter((availablePage) =>
          state.url.toString().startsWith(UrlConst.SLASH + availablePage)
        );
        if (filteredMenu.length === 0) {
          return this.cantActivate();
        }
        return true;
      })
    );
  }

  private cantActivate(): boolean {
    this.routingService.navigate(UrlConst.PATH_SIGN_IN);
    return false;
  }
}
