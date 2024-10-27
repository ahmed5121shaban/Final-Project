import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedItemsComponent } from './accepted-items.component';

describe('AcceptedItemsComponent', () => {
  let component: AcceptedItemsComponent;
  let fixture: ComponentFixture<AcceptedItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcceptedItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
