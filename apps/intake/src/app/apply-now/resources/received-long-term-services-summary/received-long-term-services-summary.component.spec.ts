import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedLongTermServicesSummaryComponent } from './received-long-term-services-summary.component';

describe('ReceivedLongTermServicesSummaryComponent', () => {
  let component: ReceivedLongTermServicesSummaryComponent;
  let fixture: ComponentFixture<ReceivedLongTermServicesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceivedLongTermServicesSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedLongTermServicesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
