import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedLongTermServicesDetailsComponent } from './received-long-term-services-details.component';

describe('PregnancyDetailsScreenComponent', () => {
  let component: ReceivedLongTermServicesDetailsComponent;
  let fixture: ComponentFixture<ReceivedLongTermServicesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceivedLongTermServicesDetailsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedLongTermServicesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
