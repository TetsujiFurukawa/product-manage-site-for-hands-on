import { TestBed } from '@angular/core/testing';

import { SearchParamsService } from './search-params.service';

xdescribe('SearchParamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchParamsService = TestBed.get(SearchParamsService);
    expect(service).toBeTruthy();
  });
});
