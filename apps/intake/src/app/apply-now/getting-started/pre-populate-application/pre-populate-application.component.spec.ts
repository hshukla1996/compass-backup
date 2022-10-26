import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrePopulateApplicationComponent } from './pre-populate-application.component';

describe('PrePopulateApplicationComponent', () => {
  let component: PrePopulateApplicationComponent;
  let fixture: ComponentFixture<PrePopulateApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrePopulateApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrePopulateApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
