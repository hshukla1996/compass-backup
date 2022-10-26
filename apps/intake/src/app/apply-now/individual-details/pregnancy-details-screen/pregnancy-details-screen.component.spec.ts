import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnancyDetailsScreenComponent } from './pregnancy-details-screen.component';

describe('PregnancyDetailsScreenComponent', () => {
  let component: PregnancyDetailsScreenComponent;
  let fixture: ComponentFixture<PregnancyDetailsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PregnancyDetailsScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregnancyDetailsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
