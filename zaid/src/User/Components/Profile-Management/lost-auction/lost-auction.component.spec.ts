/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LostAuctionComponent } from './lost-auction.component';

describe('LostAuctionComponent', () => {
  let component: LostAuctionComponent;
  let fixture: ComponentFixture<LostAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LostAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
