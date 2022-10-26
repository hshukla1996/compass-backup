import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomePastJobMoreDetailsComponent } from './income-pastjobmoredetails.component';

describe('IncomePastJobMoreDetailsComponent', () => {
  let component: IncomePastJobMoreDetailsComponent;
  let fixture: ComponentFixture<IncomePastJobMoreDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncomePastJobMoreDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomePastJobMoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
