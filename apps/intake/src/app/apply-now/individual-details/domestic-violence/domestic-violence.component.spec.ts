import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomesticViolenceComponent } from './domestic-violence.component';

describe('BenefitsNotReceviedComponent', () => {
  let component: DomesticViolenceComponent;
  let fixture: ComponentFixture<DomesticViolenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomesticViolenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomesticViolenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
