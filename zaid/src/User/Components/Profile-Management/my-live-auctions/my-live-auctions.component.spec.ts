import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLiveAuctionsComponent } from './my-live-auctions.component';

describe('MyLiveAuctionsComponent', () => {
  let component: MyLiveAuctionsComponent;
  let fixture: ComponentFixture<MyLiveAuctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyLiveAuctionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyLiveAuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
