import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallStatus } from './overall-status';

describe('OverallStatus', () => {
  let component: OverallStatus;
  let fixture: ComponentFixture<OverallStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverallStatus],
    }).compileComponents();

    fixture = TestBed.createComponent(OverallStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
