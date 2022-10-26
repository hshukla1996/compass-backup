import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomesummaryComponent } from './incomesummary.component';

describe('IncomesummaryComponent', () => {
  let component: IncomesummaryComponent;
  let fixture: ComponentFixture<IncomesummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomesummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomesummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
