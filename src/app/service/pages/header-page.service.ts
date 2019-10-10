import { Injectable } from '@angular/core';
import { AccountService } from '../common/account.service';
import { MenuListResponseDto } from 'src/app/entity/dto/response/menu-list-response-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderPageService {

  constructor(
    private accountService: AccountService
  ) { }

  public getMenu(): Observable<MenuListResponseDto[]> {
    return this.accountService.getMenu();
  }

}
