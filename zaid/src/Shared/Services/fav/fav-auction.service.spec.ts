import { TestBed } from '@angular/core/testing';

import { FavAuctionService } from './fav-auction.service';

describe('FavAuctionService', () => {
  let service: FavAuctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavAuctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
