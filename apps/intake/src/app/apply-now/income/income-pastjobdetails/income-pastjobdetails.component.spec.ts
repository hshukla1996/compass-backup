import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomePastJobDetailsComponent } from './income-pastjobdetails.component';

describe('IncomePastJobDetailsComponent', () => {
  let component: IncomePastJobDetailsComponent;
  let fixture: ComponentFixture<IncomePastJobDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomePastJobDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomePastJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
