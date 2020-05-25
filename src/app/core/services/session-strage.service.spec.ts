import { AppConst } from 'src/app/pages/constants/app-const';
import { User } from 'src/app/pages/models/user';

import { TestBed } from '@angular/core/testing';

import { SessionStrageService } from './session-strage.service';

describe('SessionStrageService', () => {
  let service: SessionStrageService;
  let expectedUser: User;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStrageService);
    expectedUser = createUser();
  });

  describe('#constractor', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('#setItem,#getItem', () => {
    it('should set value', () => {
      SessionStrageService.setItem(AppConst.STRAGE_KEY_USER, expectedUser);
      const res: User = SessionStrageService.getItem(AppConst.STRAGE_KEY_USER, new User());
      expect(res.userAccount).toEqual(expectedUser.userAccount);
      expect(res.userName).toEqual(expectedUser.userName);
      expect(res.userLocale).toEqual(expectedUser.userLocale);
      expect(res.userLanguage).toEqual(expectedUser.userLanguage);
      expect(res.userTimezone).toEqual(expectedUser.userTimezone);
      expect(res.userTimezoneOffset).toEqual(expectedUser.userTimezoneOffset);
      expect(res.userCurrency).toEqual(expectedUser.userCurrency);
    });
  });

  describe('#removeItem', () => {
    it('should remove value', () => {
      SessionStrageService.setItem(AppConst.STRAGE_KEY_USER, expectedUser);
      SessionStrageService.removeItem(AppConst.STRAGE_KEY_USER);
      expect(SessionStrageService.getItem(AppConst.STRAGE_KEY_USER, new User())).toBeNull();
    });
  });
});

function createUser() {
  const user: User = new User();
  user.userAccount = 'userAccount';
  user.userName = 'userName';
  user.userLocale = 'ja-JP';
  user.userLanguage = 'ja';
  user.userTimezone = 'Asia/Tokyo';
  user.userTimezoneOffset = '+0900';
  user.userCurrency = 'JPY';
  return user;
}
