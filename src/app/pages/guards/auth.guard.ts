import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { RoutingService } from '../../core/services/routing.service';
import { UrlConst } from '../constants/url-const';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private routingService: RoutingService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
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
