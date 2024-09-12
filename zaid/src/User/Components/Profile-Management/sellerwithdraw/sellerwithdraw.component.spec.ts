import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerwithdrawComponent } from './sellerwithdraw.component';

describe('SellerwithdrawComponent', () => {
  let component: SellerwithdrawComponent;
  let fixture: ComponentFixture<SellerwithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerwithdrawComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerwithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
