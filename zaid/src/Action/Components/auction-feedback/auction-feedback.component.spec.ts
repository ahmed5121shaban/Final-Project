import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionFeedbackComponent } from './auction-feedback.component';

describe('AuctionFeedbackComponent', () => {
  let component: AuctionFeedbackComponent;
  let fixture: ComponentFixture<AuctionFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuctionFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
