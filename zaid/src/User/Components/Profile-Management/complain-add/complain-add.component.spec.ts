import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainAddComponent } from './complain-add.component';

describe('ComplainAddComponent', () => {
  let component: ComplainAddComponent;
  let fixture: ComponentFixture<ComplainAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComplainAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplainAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
