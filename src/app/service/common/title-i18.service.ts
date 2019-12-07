import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class TitleI18Service {

  constructor(
    private accountService: AccountService,
    private translateService: TranslateService,
    private title: Title,
  ) { }

  public setTitle(subTitle: string) {
    this.setupLangage();
    const titleSystem = this.translateService.instant('title.system');
    const titleSub = this.translateService.instant('title.' + subTitle);
    this.title.setTitle(titleSystem + titleSub);
  }

  private setupLangage() {
    if (this.accountService.getUser() === null) {
      return;
    }
    const lang = this.accountService.getUser().userLanguage;
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
  }

}
