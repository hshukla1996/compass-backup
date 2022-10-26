import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedLongTermServicesComponent } from './received-long-term-services.component';

describe('ReceivedLongTermServicesComponent', () => {
  let component: ReceivedLongTermServicesComponent;
  let fixture: ComponentFixture<ReceivedLongTermServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceivedLongTermServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedLongTermServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
