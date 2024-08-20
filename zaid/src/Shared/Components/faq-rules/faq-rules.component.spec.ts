import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqRulesComponent } from './faq-rules.component';

describe('FaqRulesComponent', () => {
  let component: FaqRulesComponent;
  let fixture: ComponentFixture<FaqRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaqRulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
