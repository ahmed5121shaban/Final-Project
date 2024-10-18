import { TestBed } from '@angular/core/testing';

import { AdminAuctionsService } from './admin-auctions.service';

describe('AdminAuctionsService', () => {
  let service: AdminAuctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAuctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
