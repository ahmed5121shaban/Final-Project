import { TestBed } from '@angular/core/testing';

import { FavCategoryService } from './fav-category.service';

describe('FavCategoryService', () => {
  let service: FavCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
