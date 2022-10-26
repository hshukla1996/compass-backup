import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoIsGuardianComponent } from './who-is-guardian.component';

describe('WhoIsGuardianComponent', () => {
  let component: WhoIsGuardianComponent;
  let fixture: ComponentFixture<WhoIsGuardianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhoIsGuardianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoIsGuardianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
