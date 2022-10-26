import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnancyScreenComponent } from './pregnancy-screen.component';

describe('BenefitsNotReceviedComponent', () => {
  let component: PregnancyScreenComponent;
  let fixture: ComponentFixture<PregnancyScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregnancyScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregnancyScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
