import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WonAuctionComponent } from './won-auction.component';

describe('WonAuctionComponent', () => {
  let component: WonAuctionComponent;
  let fixture: ComponentFixture<WonAuctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WonAuctionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WonAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
