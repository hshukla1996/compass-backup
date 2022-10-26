import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterRegistrationComponent } from './voter-registration.component';

describe('GeneralDetailsComponent', () => {
  let component: VoterRegistrationComponent;
  let fixture: ComponentFixture<VoterRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoterRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
