import { TestBed } from '@angular/core/testing';

import { TitleI18Service } from './title-i18.service';

xdescribe('TitleI18Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TitleI18Service = TestBed.get(TitleI18Service);
    expect(service).toBeTruthy();
  });
});
