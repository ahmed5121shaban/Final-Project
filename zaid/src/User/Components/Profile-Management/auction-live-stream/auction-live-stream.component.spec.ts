import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionLiveStreamComponent } from './auction-live-stream.component';

describe('AuctionLiveStreamComponent', () => {
  let component: AuctionLiveStreamComponent;
  let fixture: ComponentFixture<AuctionLiveStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuctionLiveStreamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionLiveStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
