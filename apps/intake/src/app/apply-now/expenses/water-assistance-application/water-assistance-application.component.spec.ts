import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterAssistanceApplicationComponent } from './water-assistance-application.component';

describe('WaterAssistanceApplicationComponent', () => {
  let component: WaterAssistanceApplicationComponent;
  let fixture: ComponentFixture<WaterAssistanceApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterAssistanceApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterAssistanceApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
